import { motion } from 'motion/react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { gradientStyle } from '../constants/gradient'

const stats = [
  { value: '01', label: '灵感落地' },
  { value: '02', label: '影像表达' },
  { value: '03', label: '真实呈现' },
]

const chips = ['创意概念', '视觉设计', '技术实现', '未来感']

export function ClosingSlogan() {
  return (
    <section className="relative z-20 min-h-screen overflow-hidden px-6 py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-white/60 shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
        <div className="absolute right-[16%] top-[26%] h-3 w-3 rounded-full bg-white/25 shadow-[0_0_24px_rgba(255,255,255,0.8)]" />
        <div className="absolute left-[20%] bottom-[28%] h-24 w-24 rounded-full border border-white/10" />
        <div className="absolute right-[10%] bottom-[18%] h-36 w-36 rounded-full border border-white/10" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between">
        <div className="flex items-center justify-between gap-4 pt-2 text-xs md:text-sm text-white/55">
          <div className="flex items-center gap-2 tracking-[0.28em] uppercase">
            <Sparkles className="w-4 h-4" />
            Closing page
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
            2026 / DJI-inspired concept
          </div>
        </div>

        <div className="grid flex-1 items-center gap-12 py-10 md:grid-cols-[1.2fr_0.8fr] md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-sm md:text-base text-white/50 tracking-[0.22em] uppercase">
              End of story, start of imagination
            </p>
            <h2 className="mt-6 text-5xl md:text-8xl font-semibold tracking-tight leading-[0.9]">
              <span className="block text-white">从你的想象</span>
              <span className="block animate-shiny" style={gradientStyle}>
                到世界现象
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-sm md:text-lg text-white/60 leading-[1.75]">
              把灵感变成画面，把概念变成体验，把想象落到真实世界。
              这一页留给你的创意，也留给下一次出发。
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4"
          >
            <div className="liquid-glass rounded-3xl border border-white/10 p-6 md:p-7">
              <div className="text-white/45 text-xs uppercase tracking-[0.24em]">Final frame</div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div key={stat.value} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl md:text-3xl font-semibold text-white">{stat.value}</div>
                    <div className="mt-2 text-xs md:text-sm text-white/55">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://we.dji.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group liquid-glass flex items-center justify-between rounded-3xl border border-white/10 p-6 md:p-7 text-left transition-transform hover:-translate-y-0.5"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-white/45">Explore more</div>
                <div className="mt-2 text-lg md:text-xl font-medium text-white/90">前往大疆招聘官网</div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="pb-2 text-center text-xs md:text-sm text-white/35">
          Designed as a full-screen closing page.
        </div>
      </div>
    </section>
  )
}
