import argparse
import wave
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import torch


def save_wav(path: Path, signal: np.ndarray, sample_rate: int) -> None:
    """Save float signal (-1.0 to 1.0) to a mono 16-bit WAV file."""
    clipped = np.clip(signal, -1.0, 1.0)
    pcm16 = (clipped * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(pcm16.tobytes())


def scale_signals_for_wav(signals: list[np.ndarray], target_peak: float = 0.95) -> list[np.ndarray]:
    """Scale a signal group with shared gain to avoid clipping."""
    peak = max(float(np.max(np.abs(sig))) for sig in signals)
    if peak < 1e-12:
        return signals
    gain = min(1.0, target_peak / peak)
    return [sig * gain for sig in signals]


def moving_average(signal: np.ndarray, window_size: int) -> np.ndarray:
    """Smooth a signal to make overall amplitude changes easier to see."""
    window = np.ones(window_size, dtype=np.float64) / window_size
    return np.convolve(np.abs(signal), window, mode="same")


def separate_tone_component(
    signal: np.ndarray, t: np.ndarray, freq: float
) -> tuple[np.ndarray, np.ndarray]:
    """Separate a target single-tone component from a mixed signal."""
    basis_sin = np.sin(2 * np.pi * freq * t)
    basis_cos = np.cos(2 * np.pi * freq * t)
    basis = np.column_stack([basis_sin, basis_cos])
    coeffs, *_ = np.linalg.lstsq(basis, signal, rcond=None)
    tone_est = basis @ coeffs
    non_tone = signal - tone_est
    return tone_est, non_tone


def main(show_plot: bool, target_db: float) -> None:
    # Signal parameters
    sample_rate = 48_000
    duration = 2.0  # 2 seconds, easier to hear in audio players
    frequency = 440.0
    amplitude = 0.8

    # 1) Create a 440Hz sinusoidal noise signal using NumPy
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    noise = amplitude * np.sin(2 * np.pi * frequency * t)

    # 2) Compute anti-phase waveform (180° shift) using NumPy
    anti_noise_np = -noise

    # 3) Compute anti-phase waveform (180° shift) using PyTorch
    noise_torch = torch.from_numpy(noise.astype(np.float32))
    anti_noise_torch = -noise_torch
    anti_noise_torch_np = anti_noise_torch.numpy()

    # 4) Mix original signal and anti-phase signal (ideal cancellation)
    mixed_np = noise + anti_noise_np
    mixed_torch = noise + anti_noise_torch_np

    # 5) Tunable ANC depth simulation (single-tone).
    # If anti-noise is perfectly aligned, cancellation depth is set by gain error:
    #   mixed = noise + (-k*noise) = (1-k)*noise
    #   attenuation_db = 20*log10(|1-k|)
    #
    # To target a depth like -40~-50 dB, we set:
    #   |1-k| = 10^(target_db/20)  (target_db is negative)
    #   k = 1 - 10^(target_db/20)
    residual_ratio = float(10 ** (target_db / 20.0))
    k = 1.0 - residual_ratio
    anti_noise_realistic = -k * noise
    mixed_realistic = noise + anti_noise_realistic

    noise_rms = np.sqrt(np.mean(noise**2))
    realistic_rms = np.sqrt(np.mean(mixed_realistic**2))
    attenuation_db = 20 * np.log10(realistic_rms / noise_rms)

    # Numerical check
    print(f"NumPy 抵消后最大残差: {np.max(np.abs(mixed_np)):.8e}")
    print(f"PyTorch 抵消后最大残差: {np.max(np.abs(mixed_torch)):.8e}")
    print(f"现实 ANC 抵消后 RMS: {realistic_rms:.6f}")
    print(f"现实 ANC 相对原噪音衰减: {attenuation_db:.2f} dB")

    # 6) Daily-scene simulation:
    #    Build a non-noise signal, mix in 440Hz noise, then only cancel the noise part.
    rng = np.random.default_rng(7)
    voice_like = (
        0.17 * np.sin(2 * np.pi * 180 * t)
        + 0.13 * np.sin(2 * np.pi * 260 * t + 0.7)
        + 0.10 * np.sin(2 * np.pi * 350 * t + 1.3)
    )
    envelope = 0.55 + 0.45 * np.sin(2 * np.pi * 1.3 * t) ** 2
    ambient = 0.02 * rng.standard_normal(len(t))
    non_noise_daily = envelope * voice_like + ambient

    # Make target noise sufficiently strong so before/after is obvious by ear.
    noise_daily = 0.42 * np.sin(2 * np.pi * frequency * t + 0.3)
    mixed_daily = non_noise_daily + noise_daily

    # Separate target noise (440Hz) from other content, then only cancel that component.
    estimated_noise, estimated_non_noise = separate_tone_component(mixed_daily, t, frequency)
    anti_noise_daily = -k * estimated_noise
    cleaned_daily = mixed_daily + anti_noise_daily

    # Re-estimate 440Hz component after ANC for an objective attenuation metric.
    residual_noise_after, _ = separate_tone_component(cleaned_daily, t, frequency)
    noise_before_rms = np.sqrt(np.mean(estimated_noise**2))
    noise_after_rms = np.sqrt(np.mean(residual_noise_after**2))
    noise_only_attenuation_db = 20 * np.log10(noise_after_rms / noise_before_rms)
    snr_before_db = 10 * np.log10(np.mean(non_noise_daily**2) / np.mean(noise_daily**2))
    residual_from_truth = cleaned_daily - non_noise_daily
    snr_after_db = 10 * np.log10(np.mean(non_noise_daily**2) / np.mean(residual_from_truth**2))
    snr_improvement_db = snr_after_db - snr_before_db
    print(f"生活场景中 440Hz 噪音衰减: {noise_only_attenuation_db:.2f} dB")
    print(f"生活场景 SNR 改善: {snr_improvement_db:.2f} dB (before={snr_before_db:.2f} dB, after={snr_after_db:.2f} dB)")

    # Save audio files for listening
    out_dir = Path(__file__).parent
    save_wav(out_dir / "noise_440hz.wav", noise, sample_rate)
    save_wav(out_dir / "anti_noise_440hz.wav", anti_noise_np, sample_rate)
    save_wav(out_dir / "cancelled_ideal.wav", mixed_np, sample_rate)
    save_wav(out_dir / "anti_noise_realistic.wav", anti_noise_realistic, sample_rate)
    save_wav(out_dir / "cancelled_realistic.wav", mixed_realistic, sample_rate)
    scene_signals = scale_signals_for_wav(
        [
            non_noise_daily,
            mixed_daily,
            estimated_noise,
            estimated_non_noise,
            anti_noise_daily,
            cleaned_daily,
        ]
    )
    (
        non_noise_daily_wav,
        mixed_daily_wav,
        estimated_noise_wav,
        estimated_non_noise_wav,
        anti_noise_daily_wav,
        cleaned_daily_wav,
    ) = scene_signals
    save_wav(out_dir / "scene_daily_clean_reference_v2.wav", non_noise_daily_wav, sample_rate)
    save_wav(out_dir / "scene_daily_with_noise_v2.wav", mixed_daily_wav, sample_rate)
    save_wav(out_dir / "scene_estimated_noise_v2.wav", estimated_noise_wav, sample_rate)
    save_wav(out_dir / "scene_estimated_non_noise_v2.wav", estimated_non_noise_wav, sample_rate)
    save_wav(out_dir / "scene_anti_noise_v2.wav", anti_noise_daily_wav, sample_rate)
    save_wav(out_dir / "scene_daily_after_anc_v2.wav", cleaned_daily_wav, sample_rate)

    # Plot only the first few cycles, otherwise the waveform looks like a solid block.
    plot_duration = 0.012  # about 5 cycles at 440 Hz
    plot_samples = int(sample_rate * plot_duration)
    t_plot = t[:plot_samples]
    noise_plot = noise[:plot_samples]
    anti_noise_plot = anti_noise_np[:plot_samples]
    mixed_ideal_plot = mixed_np[:plot_samples]
    mixed_realistic_plot = mixed_realistic[:plot_samples]

    # Plot comparison
    fig, axes = plt.subplots(3, 1, figsize=(10, 8), sharex=True)
    fig.suptitle("ANC Demo: 440 Hz Noise Cancellation", fontsize=14)

    axes[0].plot(t_plot, noise_plot, label="Original noise x(t)", color="tab:blue")
    axes[0].set_ylabel("Amplitude")
    axes[0].legend(loc="upper right")
    axes[0].grid(alpha=0.3)

    axes[1].plot(t_plot, anti_noise_plot, label="Anti-noise -x(t)", color="tab:orange")
    axes[1].set_ylabel("Amplitude")
    axes[1].legend(loc="upper right")
    axes[1].grid(alpha=0.3)

    axes[2].plot(t_plot, mixed_ideal_plot, label="Ideal sum x(t)+(-x(t))", color="tab:green")
    axes[2].plot(
        t_plot,
        mixed_realistic_plot,
        label=f"Targeted sum ({target_db:.1f} dB)",
        color="tab:red",
        alpha=0.8,
    )
    axes[2].set_xlabel("Time (s)")
    axes[2].set_ylabel("Amplitude")
    axes[2].legend(loc="upper right")
    axes[2].grid(alpha=0.3)

    plt.tight_layout()
    out_png = out_dir / "anc_cancellation_demo.png"
    plt.savefig(out_png, dpi=160)
    if show_plot:
        plt.show()
    else:
        plt.close(fig)

    # Plot full-duration envelope so the overall energy difference is visible.
    envelope_window = int(sample_rate * 0.01)  # 10 ms smoothing
    noise_envelope = moving_average(noise, envelope_window)
    realistic_envelope = moving_average(mixed_realistic, envelope_window)

    fig_env, ax_env = plt.subplots(figsize=(10, 4.5))
    ax_env.plot(t, noise_envelope, label="Original noise envelope", color="tab:blue")
    ax_env.plot(
        t,
        realistic_envelope,
        label=f"Residual (target {target_db:.1f} dB)",
        color="tab:red",
        alpha=0.85,
    )
    ax_env.set_title("Envelope Comparison Over Full Duration")
    ax_env.set_xlabel("Time (s)")
    ax_env.set_ylabel("Smoothed |amplitude|")
    ax_env.legend(loc="upper right")
    ax_env.grid(alpha=0.3)
    plt.tight_layout()
    out_env_png = out_dir / "anc_envelope_comparison.png"
    plt.savefig(out_env_png, dpi=160)
    if show_plot:
        plt.show()
    else:
        plt.close(fig_env)

    # Plot frequency spectrum to show the reduction at 440 Hz directly.
    freqs = np.fft.rfftfreq(len(noise), d=1 / sample_rate)
    noise_spectrum = np.abs(np.fft.rfft(noise))
    realistic_spectrum = np.abs(np.fft.rfft(mixed_realistic))

    fig_fft, ax_fft = plt.subplots(figsize=(10, 4.5))
    ax_fft.plot(freqs, noise_spectrum, label="Original noise spectrum", color="tab:blue")
    ax_fft.plot(
        freqs,
        realistic_spectrum,
        label=f"Residual spectrum (target {target_db:.1f} dB)",
        color="tab:red",
        alpha=0.85,
    )
    ax_fft.set_xlim(0, 2000)
    ax_fft.set_title("Spectrum Comparison")
    ax_fft.set_xlabel("Frequency (Hz)")
    ax_fft.set_ylabel("Magnitude")
    ax_fft.legend(loc="upper right")
    ax_fft.grid(alpha=0.3)
    plt.tight_layout()
    out_fft_png = out_dir / "anc_spectrum_comparison.png"
    plt.savefig(out_fft_png, dpi=160)
    if show_plot:
        plt.show()
    else:
        plt.close(fig_fft)

    print(f"音频文件已保存到: {out_dir}")
    print(f"图像已保存到: {out_png}")
    print(f"包络图已保存到: {out_env_png}")
    print(f"频谱图已保存到: {out_fft_png}")

    # Plot daily-scene separation and targeted noise cancellation.
    t_daily_plot = t_plot
    mixed_daily_plot = mixed_daily[:plot_samples]
    estimated_noise_plot = estimated_noise[:plot_samples]
    estimated_non_noise_plot = estimated_non_noise[:plot_samples]
    cleaned_daily_plot = cleaned_daily[:plot_samples]

    fig_daily, axes_daily = plt.subplots(4, 1, figsize=(10, 9), sharex=True)
    fig_daily.suptitle("Daily Scene: Separate Noise And Cancel Only Noise", fontsize=13)

    axes_daily[0].plot(t_daily_plot, mixed_daily_plot, color="tab:purple", label="Mixed scene")
    axes_daily[0].legend(loc="upper right")
    axes_daily[0].set_ylabel("Amp")
    axes_daily[0].grid(alpha=0.3)

    axes_daily[1].plot(t_daily_plot, estimated_noise_plot, color="tab:orange", label="Estimated 440Hz noise")
    axes_daily[1].legend(loc="upper right")
    axes_daily[1].set_ylabel("Amp")
    axes_daily[1].grid(alpha=0.3)

    axes_daily[2].plot(
        t_daily_plot, estimated_non_noise_plot, color="tab:blue", label="Estimated non-noise content"
    )
    axes_daily[2].legend(loc="upper right")
    axes_daily[2].set_ylabel("Amp")
    axes_daily[2].grid(alpha=0.3)

    axes_daily[3].plot(t_daily_plot, cleaned_daily_plot, color="tab:green", label="Scene after ANC")
    axes_daily[3].legend(loc="upper right")
    axes_daily[3].set_ylabel("Amp")
    axes_daily[3].set_xlabel("Time (s)")
    axes_daily[3].grid(alpha=0.3)

    plt.tight_layout()
    out_daily_png = out_dir / "anc_daily_scene_separation.png"
    plt.savefig(out_daily_png, dpi=160)
    if show_plot:
        plt.show()
    else:
        plt.close(fig_daily)
    print(f"生活场景分离图已保存到: {out_daily_png}")
    print("新版场景音频已保存为 *_v2.wav（不覆盖你之前的结果）")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ANC 反相降噪演示")
    parser.add_argument("--show", action="store_true", help="显示图像窗口")
    parser.add_argument(
        "--target-db",
        type=float,
        default=-45.0,
        help="目标降噪深度（dB，负数更深，例如 -40, -50）",
    )
    args = parser.parse_args()
    main(show_plot=args.show, target_db=args.target_db)
