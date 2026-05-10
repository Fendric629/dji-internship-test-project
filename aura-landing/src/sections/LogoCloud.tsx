import { motion } from 'motion/react'

const names = [
  '研发工程',
  '影像与算法',
  '飞控与安全',
  '工业与产品设计',
  '产品与市场',
  '供应链与质量',
  '企业解决方案',
  '农业与服务',
]

export function LogoCloud() {
  return (
    <section
      id="ecosystem"
      className="relative z-20 max-w-6xl mx-auto px-6 py-16 md:py-20"
    >
      <p className="text-center text-xs uppercase tracking-widest text-white/40">
        大疆业务与人才方向示意（非实时招聘列表）
      </p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {names.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="flex justify-center"
          >
            <span className="text-sm font-semibold tracking-tight text-white/50 hover:text-white cursor-default transition-colors text-center">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
