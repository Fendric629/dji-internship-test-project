import { motion } from 'motion/react'
import { PrimaryCta } from '../components/primitives'
import { gradientStyle } from '../constants/gradient'

export function Hero() {
  return (
    <section className="relative z-20 pt-16 md:pt-28 pb-20 text-center flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]">
          <span className="block text-white">与未来同行</span>
          <span
            className="block animate-shiny"
            style={gradientStyle}
          >
            从大疆实习开始
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
      >
        走进创新硬件与影像技术的幕后：暑期与日常实习、导师带教、真实项目历练。以下示意界面仅作排版展示，岗位与流程请以官方招聘渠道为准。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <PrimaryCta />
        <p className="text-xs text-white/40">本页为设计示意，非官方下载或安装入口</p>
      </motion.div>
    </section>
  )
}
