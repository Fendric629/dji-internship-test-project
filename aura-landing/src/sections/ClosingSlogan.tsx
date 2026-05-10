import { motion } from 'motion/react'
import { ChevronRight, Sparkles, WandSparkles } from 'lucide-react'
import { gradientStyle } from '../constants/gradient'

const highlights = ['创意概念', '影像表达', '技术实现']

export function ClosingSlogan() {
  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/10 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl w-full text-center"
      >
        <div className="flex items-center justify-center gap-2 text-white/50 text-xs md:text-sm tracking-[0.25em] uppercase">
          <Sparkles className="w-4 h-4" />
          Closing note
          <WandSparkles className="w-4 h-4" />
        </div>

        <h2 className="mt-6 text-4xl md:text-7xl font-semibold tracking-tight leading-[0.92]">
          <span className="block animate-shiny" style={gradientStyle}>
            从你的想象 到世界现象
          </span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-white/60 leading-[1.7]">
          把灵感变成画面，把概念变成体验，把想象落到真实世界。
          这一页留给你的创意，也留给下一次出发。
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80 backdrop-blur-md"
            >
              {item}
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  )
}
