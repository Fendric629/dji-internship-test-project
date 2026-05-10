import numpy as np
from scipy.io import wavfile
from scipy import signal as sig
import matplotlib.pyplot as plt


def create_rotating_spatial_audio(duration=5, freq=440, sr=44100):
    """
    创建一个 duration 秒内声源绕头旋转一圈的立体声（ILD 简化模型）。
    """
    t = np.linspace(0, duration, int(sr * duration))
    signal = 0.5 * np.sin(2 * np.pi * freq * t)

    left_channel = np.zeros_like(signal)
    right_channel = np.zeros_like(signal)

    for i in range(len(t)):
        angle = (t[i] / duration) * 2 * np.pi
        left_vol = 0.5 + 0.5 * np.sin(angle)
        right_vol = 0.5 - 0.5 * np.sin(angle)

        left_channel[i] = signal[i] * left_vol
        right_channel[i] = signal[i] * right_vol

    stereo = np.vstack((left_channel, right_channel)).T
    return stereo.astype(np.float64)


def constant_power_pan_gains(pan):
    """
    pan in [-1, 1]：-1 全左，0 正中，+1 全右。恒定功率声像。
    """
    pan = float(np.clip(pan, -1.0, 1.0))
    angle = (pan + 1.0) * (np.pi / 4.0)
    return np.cos(angle), np.sin(angle)


def scene_pan_gains(pan, head_bleed=0.34):
    """
    同一场景下的声像：在恒定功率 pan 上混入「对侧也能听到」的分量，
    模拟头/肩绕射与早期反射，避免像两轨硬贴在左右扬声器上。
    head_bleed 越大，声像越聚拢、越不像双场景拼接。
    """
    pan = float(np.clip(pan, -1.0, 1.0))
    hb = float(np.clip(head_bleed, 0.0, 0.85))
    l_dir, r_dir = constant_power_pan_gains(pan)
    l = (1.0 - hb) * l_dir + hb * 0.5
    r = (1.0 - hb) * r_dir + hb * 0.5
    p = l * l + r * r
    if p > 1e-18:
        inv = 1.0 / np.sqrt(p)
        l, r = l * inv, r * inv
    return l, r


def _ms_set_stereo_width(left, right, width):
    """width in (0, 1]：越小立体声越窄，共用的中置成分越多。"""
    w = float(np.clip(width, 0.05, 1.0))
    mid = 0.5 * (left + right)
    side = 0.5 * (left - right) * w
    return mid + side, mid - side


def mix_spatial_sources(
    source_defs,
    *,
    head_bleed=0.34,
    stereo_width=0.58,
    room_tone_db=-36.0,
    room_tone_seed=123,
    sr=44100,
):
    """
    多路单声道音源按声像混合为立体声（偏「同一房间」听感）。

    source_defs: 可迭代对象，元素为 dict：
      - "mono": 1D float 数组
      - "pan": [-1, 1] 声像
      - "gain": 可选，默认 1.0

    head_bleed: 双耳/房间串扰强度（对侧能量）。
    stereo_width: 整体立体声宽度，<1 时两耳波形更相关。
    room_tone_db: 若给定，加入两声道相同的极弱环境底噪（粘合空间感）。

    各路长度可以不同，以最长一路为时长，短的末尾补零。
    """
    if not source_defs:
        raise ValueError("source_defs 不能为空")

    lengths = [len(np.asarray(s["mono"], dtype=np.float64).ravel()) for s in source_defs]
    n = int(max(lengths))
    left = np.zeros(n, dtype=np.float64)
    right = np.zeros(n, dtype=np.float64)

    for s in source_defs:
        mono = np.asarray(s["mono"], dtype=np.float64).ravel()
        if len(mono) < n:
            mono = np.pad(mono, (0, n - len(mono)))
        else:
            mono = mono[:n]

        pan = float(s.get("pan", 0.0))
        gain = float(s.get("gain", 1.0))
        gl, gr = scene_pan_gains(pan, head_bleed=head_bleed)
        gl *= gain
        gr *= gain
        left += mono * gl
        right += mono * gr

    left, right = _ms_set_stereo_width(left, right, stereo_width)

    if room_tone_db is not None:
        rng = np.random.default_rng(room_tone_seed)
        air = rng.standard_normal(n)
        lo, hi = 350.0, min(2400.0, 0.35 * sr)
        b, a = sig.butter(2, [lo, hi], btype="band", fs=sr)
        air = sig.lfilter(b, a, air)
        air /= np.max(np.abs(air)) + 1e-12
        g = 10 ** (float(room_tone_db) / 20.0)
        left += air * g
        right += air * g

    stereo = np.column_stack((left, right))
    peak = np.max(np.abs(stereo)) + 1e-12
    return stereo / peak * 0.95


def speech_like_babble(duration, sr, seed=7):
    """
    简易「说话感」：带通噪声 + 类音节包络（非真实语音，仅作空间演示）。
    """
    n = int(duration * sr)
    rng = np.random.default_rng(seed)
    noise = rng.standard_normal(n)
    low, high = 280.0, min(3600.0, 0.42 * sr)
    b, a = sig.butter(2, [low, high], btype="band", fs=sr)
    vox = sig.lfilter(b, a, noise)
    t = np.arange(n, dtype=np.float64) / sr
    # 略不对称的包络，听起来更像断续语流
    syll = 0.55 + 0.45 * np.sin(2 * np.pi * 4.0 * t)
    syll *= 0.65 + 0.35 * np.sin(2 * np.pi * 1.1 * t + 0.3)
    vox *= syll
    vox /= np.max(np.abs(vox)) + 1e-12
    return (vox * 0.42).astype(np.float64)


def guitar_like_arpeggio(duration, sr, seed=3):
    """
    简易吉他感：分解和弦式衰减正弦 + 少量泛音。
    """
    rng = np.random.default_rng(seed)
    n = int(duration * sr)
    y = np.zeros(n, dtype=np.float64)
    # E 大调琶音感：E2 A2 B2 E3 G#3 …
    freqs = np.array([82.41, 110.0, 123.47, 164.81, 207.65], dtype=np.float64)
    cycle_s = 0.52
    note_dt = 0.09
    t_start = 0.0
    while t_start < duration:
        for i, f in enumerate(freqs):
            f *= rng.uniform(0.997, 1.003)
            t0 = t_start + i * note_dt
            if t0 >= duration:
                break
            i0 = int(t0 * sr)
            m = n - i0
            if m <= 0:
                break
            tt = np.arange(m, dtype=np.float64) / sr
            decay = np.exp(-2.8 * tt)
            pluck = np.sin(2 * np.pi * f * tt) * decay
            pluck += 0.38 * np.sin(4 * np.pi * f * tt) * np.exp(-3.4 * tt)
            pluck += 0.12 * np.sin(6 * np.pi * f * tt) * np.exp(-4.0 * tt)
            y[i0 : i0 + m] += pluck * 0.22
        t_start += cycle_s

    y /= np.max(np.abs(y)) + 1e-12
    y *= 0.48
    # 去掉过量极低频，与人声频段更好叠在一起，减少「另一个乐队」感
    bhp, ahp = sig.butter(2, 95.0, btype="highpass", fs=sr)
    y = sig.lfilter(bhp, ahp, y)
    y /= np.max(np.abs(y)) + 1e-12
    return y.astype(np.float64)


def synthetic_hall_impulse_response(sr, ir_duration_s=2.0, rt60=3.2, seed=42):
    """
    合成大礼堂风格房间脉冲响应：稀疏早期反射 + 低通扩散尾（指数衰减由 RT60 控制）。
    """
    rng = np.random.default_rng(seed)
    n = int(sr * ir_duration_s)
    ir = np.zeros(n, dtype=np.float64)

    # 早期反射：时间拉长、幅度递减，模拟大空间
    base_ms = np.array([8, 15, 23, 31, 44, 58, 76, 98, 125, 158, 198, 245])
    hall_scale = 1.65
    for k, d_ms in enumerate(base_ms):
        d = int(d_ms * hall_scale * sr / 1000.0)
        if d < n:
            ir[d] += (0.72 ** k) * rng.uniform(0.55, 1.0)

    # 扩散尾：带限噪声按 RT60 包络衰减
    t = np.arange(n, dtype=np.float64) / sr
    env = np.exp(-6.91 * t / rt60)
    diffuse = rng.standard_normal(n) * env * 0.22
    b, a = sig.butter(2, min(2800.0, 0.45 * (sr / 2.0)), fs=sr)
    diffuse = sig.lfilter(b, a, diffuse)
    ir += diffuse

    ir /= np.max(np.abs(ir)) + 1e-12
    return ir


def apply_stereo_hall_reverb(
    stereo,
    ir,
    dry_db=-1.5,
    wet_db=-8.0,
    wet_stereo_blend=0.0,
):
    """
    各声道与同一 RIR 卷积（同一声学空间），再按 dry/wet 混合。
    dry_db / wet_db 为相对 dB，避免湿声压过干声。

    wet_stereo_blend: 湿声在 L/R 之间互相渗入（模拟厅堂扩散场），
    略大于 0 时两耳共享同一混响能量，避免「左右各一套无关尾音」。
    """
    dry_lin = 10 ** (dry_db / 20.0)
    wet_lin = 10 ** (wet_db / 20.0)

    left = stereo[:, 0].astype(np.float64, copy=False)
    right = stereo[:, 1].astype(np.float64, copy=False)
    wet_l = sig.fftconvolve(left, ir, mode="full")[: len(left)]
    wet_r = sig.fftconvolve(right, ir, mode="full")[: len(right)]

    c = float(np.clip(wet_stereo_blend, 0.0, 0.55))
    if c > 0.0:
        wl = (1.0 - c) * wet_l + c * wet_r
        wr = c * wet_l + (1.0 - c) * wet_r
        wet_l, wet_r = wl, wr

    # 左右湿声一起归一化，保留两声道相对关系（不要各声道单独拉满）
    wet = np.column_stack((wet_l, wet_r))
    peak_w = np.max(np.abs(wet)) + 1e-12
    wet_l = wet[:, 0] / peak_w
    wet_r = wet[:, 1] / peak_w

    out_l = dry_lin * left + wet_lin * wet_l
    out_r = dry_lin * right + wet_lin * wet_r
    out = np.column_stack((out_l, out_r))

    peak = np.max(np.abs(out)) + 1e-12
    out = (out / peak * 0.98).astype(np.float32)
    return out


def plot_waveforms_and_ir(
    sr,
    dry_stereo,
    wet_stereo,
    ir,
    save_path="spatial_audio_waveform_compare.png",
):
    plt.rcParams["font.sans-serif"] = [
        "PingFang SC",
        "Heiti SC",
        "Songti SC",
        "Arial Unicode MS",
        "Noto Sans CJK SC",
        "SimHei",
        "DejaVu Sans",
    ]
    plt.rcParams["axes.unicode_minus"] = False

    t_dry = np.arange(len(dry_stereo)) / sr
    zoom_end = min(1.2, t_dry[-1])

    fig, axes = plt.subplots(3, 1, figsize=(11, 8), constrained_layout=True)

    # 1) 脉冲响应（前 300 ms 与整体包络）
    ax0 = axes[0]
    ir_ms = 0.3
    n_show = min(len(ir), int(ir_ms * sr))
    t_ir = np.arange(n_show) / sr * 1000
    ax0.plot(t_ir, ir[:n_show], color="#2c7fb8", lw=0.8)
    ax0.set_title("厅堂混响：房间脉冲响应 RIR（前 300 ms）")
    ax0.set_xlabel("时间 / ms")
    ax0.set_ylabel("幅度")
    ax0.grid(True, alpha=0.3)

    # 2) 左声道干 / 湿对比（局部放大）
    ax1 = axes[1]
    mask = t_dry <= zoom_end
    ax1.plot(t_dry[mask], dry_stereo[mask, 0], label="干声 L", color="#333333", alpha=0.85, lw=0.9)
    ax1.plot(
        t_dry[mask],
        wet_stereo[mask, 0],
        label="湿声 L（礼堂混响后）",
        color="#e34a33",
        alpha=0.85,
        lw=0.9,
    )
    ax1.set_title(f"波形对比：左声道（0-{zoom_end:.2f} s）")
    ax1.set_xlabel("时间 / s")
    ax1.set_ylabel("幅度")
    ax1.legend(loc="upper right")
    ax1.grid(True, alpha=0.3)

    # 3) 整段波形：湿声能量明显拖尾
    ax2 = axes[2]
    ax2.plot(t_dry, dry_stereo[:, 0], label="干声 L", color="#999999", lw=0.5, alpha=0.7)
    ax2.plot(t_dry, wet_stereo[:, 0], label="湿声 L", color="#e34a33", lw=0.5, alpha=0.85)
    ax2.set_title("整段左声道：干声 vs 混响后（可见混响尾音）")
    ax2.set_xlabel("时间 / s")
    ax2.set_ylabel("幅度")
    ax2.legend(loc="upper right")
    ax2.grid(True, alpha=0.3)

    fig.savefig(save_path, dpi=150)
    plt.close(fig)
    print(f"✅ 波形对比图已保存：{save_path}")


def plot_multi_source_waveforms(sr, dry_stereo, wet_stereo, save_path="spatial_multi_waveforms.png"):
    """多音源混合：展示立体声 L/R 干声与混响后波形。"""
    plt.rcParams["font.sans-serif"] = [
        "PingFang SC",
        "Heiti SC",
        "Songti SC",
        "Arial Unicode MS",
        "Noto Sans CJK SC",
        "SimHei",
        "DejaVu Sans",
    ]
    plt.rcParams["axes.unicode_minus"] = False

    t = np.arange(len(dry_stereo)) / sr
    zoom_end = min(2.5, t[-1])
    mask = t <= zoom_end

    fig, axes = plt.subplots(2, 1, figsize=(11, 6.5), constrained_layout=True)

    ax0 = axes[0]
    ax0.plot(t[mask], dry_stereo[mask, 0], label="L", color="#1b7837", lw=0.85, alpha=0.9)
    ax0.plot(t[mask], dry_stereo[mask, 1], label="R", color="#762a83", lw=0.85, alpha=0.9)
    ax0.set_title(f"同一场景 · 干声 L/R（0-{zoom_end:.2f} s，含串扰与收窄）")
    ax0.set_xlabel("时间 / s")
    ax0.set_ylabel("幅度")
    ax0.legend(loc="upper right")
    ax0.grid(True, alpha=0.3)

    ax1 = axes[1]
    ax1.plot(t, dry_stereo[:, 0], label="干声 L", color="#b2df8a", lw=0.45, alpha=0.75)
    ax1.plot(t, dry_stereo[:, 1], label="干声 R", color="#c2a5cf", lw=0.45, alpha=0.75)
    ax1.plot(t, wet_stereo[:, 0], label="混响后 L", color="#2166ac", lw=0.5, alpha=0.9)
    ax1.plot(t, wet_stereo[:, 1], label="混响后 R", color="#b2182b", lw=0.5, alpha=0.9)
    ax1.set_title("整段：干声 vs 厅堂混响后（L / R）")
    ax1.set_xlabel("时间 / s")
    ax1.set_ylabel("幅度")
    ax1.legend(loc="upper right", ncol=2, fontsize=8)
    ax1.grid(True, alpha=0.3)

    fig.savefig(save_path, dpi=150)
    plt.close(fig)
    print(f"✅ 多音源波形图已保存：{save_path}")


if __name__ == "__main__":
    sr = 44100
    duration = 6.0

    # --- 多音源：左偏人声、右偏吉他（温和声像 + 串扰 + 共享混响场）---
    voice = speech_like_babble(duration, sr, seed=11)
    guitar = guitar_like_arpeggio(duration, sr, seed=19)
    dry_multi = mix_spatial_sources(
        [
            {"mono": voice, "pan": -0.42, "gain": 1.0},
            {"mono": guitar, "pan": 0.48, "gain": 0.92},
        ],
        head_bleed=0.36,
        stereo_width=0.55,
        room_tone_db=-38.0,
        sr=sr,
    )
    wavfile.write(
        "spatial_multi_demo_dry.wav",
        sr,
        np.clip(dry_multi, -1.0, 1.0).astype(np.float32),
    )

    ir = synthetic_hall_impulse_response(sr, ir_duration_s=2.2, rt60=3.2)
    wet_multi = apply_stereo_hall_reverb(
        dry_multi,
        ir,
        dry_db=-2.0,
        wet_db=-6.5,
        wet_stereo_blend=0.26,
    )
    wavfile.write("spatial_multi_demo.wav", sr, wet_multi)

    plot_multi_source_waveforms(sr, dry_multi, wet_multi.astype(np.float64))

    # --- 保留：旋转单音源演示 ---
    dry_spin = create_rotating_spatial_audio(duration=5, sr=sr)
    wavfile.write(
        "spatial_360_demo_dry.wav",
        sr,
        np.clip(dry_spin, -1.0, 1.0).astype(np.float32),
    )
    wet_spin = apply_stereo_hall_reverb(
        dry_spin,
        ir,
        dry_db=-1.5,
        wet_db=-8.0,
        wet_stereo_blend=0.08,
    )
    wavfile.write("spatial_360_demo.wav", sr, wet_spin)
    plot_waveforms_and_ir(sr, dry_spin, wet_spin.astype(np.float64), ir)

    print("✅ 多音源干声：spatial_multi_demo_dry.wav")
    print("✅ 多音源礼堂：spatial_multi_demo.wav")
    print("✅ 旋转单音源干声：spatial_360_demo_dry.wav")
    print("✅ 旋转单音源礼堂：spatial_360_demo.wav")
