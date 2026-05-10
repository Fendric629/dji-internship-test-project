import { motion } from 'motion/react'
import { SectionEyebrow } from '../components/primitives'

const chips = ['按事项分类', '面试前提醒', '静默订阅邮件', '一键归档通知']

const buckets = [
  {
    title: '优先处理',
    count: 4,
    color: '#ffffff',
    items: ['大疆招聘 — 面试邀请', 'HR — 测评截止提醒'],
  },
  {
    title: '待跟进',
    count: 7,
    color: '#e5e5e5',
    items: ['导师计划 — 首周 sync', '内推人 — 补充作品集'],
  },
  {
    title: '动态更新',
    count: 18,
    color: '#a3a3a3',
    items: ['行政 — 工牌进度', '大疆大学 — 新课上线'],
  },
  {
    title: '已归档',
    count: 13,
    color: '#525252',
    items: ['投递回执 · 宣讲会回放 · 往期周报'],
  },
]

export function FeatureTriage() {
  return (
    <section
      id="solutions"
      className="relative z-20 max-w-6xl mx-auto px-6 py-20 md:py-28"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionEyebrow label="收件箱整理" tag="示意功能" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            一眼看清
            <br />
            实习相关邮件。
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            将面试、测评、入职与培训通知自动分组——上图仅为视觉示意，不代表真实产品能力。正式申请与通知请以官方邮件与招聘系统为准。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="liquid-glass rounded-2xl p-5">
          <p className="text-xs text-white/50 mb-4">今日 · 已分类 42 封（示意）</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {buckets.map((b) => (
              <div key={b.title} className="liquid-glass rounded-lg p-3">
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: b.color }}
                  >
                    {b.title} ({b.count})
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/60">
                  {b.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
