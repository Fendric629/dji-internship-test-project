import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { PrimaryCta } from '../components/primitives'

export function FinalCTA() {
  return (
    <section className="relative z-20 max-w-6xl mx-auto px-6 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)',
          }}
        />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
            从一封邮件开始，
            <br />
            走近大疆的日常。
          </h2>
          <p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
            若你正在准备实习申请，不妨先收藏官方渠道、理清时间节点。本页为展示排版，不提供内推码售卖与「保过」服务。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryCta label="回到实习介绍" />
            <a
              href="https://we.dji.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition-colors"
            >
              前往大疆招聘官网
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-px" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
