import { motion } from 'motion/react'
import { ChevronRight, MapPin } from 'lucide-react'
import { SectionEyebrow } from '../components/primitives'

/** 与 we.dji.com 校园招聘「实习生招聘」一致；完整 JD 以官网为准 */
const OFFICIAL_INTERNS =
  'https://we.dji.com/zh-CN/campus/position?project=intern'

/** 官网列表中办公地为深圳、北京的 AI 实习生岗位（岗位名与分类与招聘页一致） */
const AI_INTERN_SHARED_DESC =
  '我们致力于把大疆设备和大疆用户紧密相连，「让机器有温度，让数据会说话」是我们的核心使命。在这里，你将让代码的影响力突破屏幕的边界，触达每一个鲜活的用户场景；更多职责与要求以官网职位详情全文为准。'

const aiInternFromOfficial = [
  {
    title: 'AI 实习生-前端开发 (AI Coding)',
  },
  {
    title: 'AI 实习生-全栈开发',
  },
  {
    title: 'AI 实习生-客户端开发 (AI Coding)',
  },
  {
    title: 'AI 实习生-后端开发 (AI Coding)',
  },
] as const

const aiInternMeta = {
  team: '技术类 | 研发团队',
  city: '深圳市，北京市',
  posted: '2026-04-13',
}

const CV_ALGO_INTERN_DESC =
  '计算机视觉算法实习：大模型、多模态与三维相关技术落地产品，与研发及产品协作。详情见官网。'

const CAMPUS_AMBASSADOR_DESC =
  '校园品牌与社群运营：传递校招与雇主品牌，组织宣讲、分享与体验活动。详情见官网。'

const otherPositions = [
  {
    title: '大疆 2027 校园大使',
    team: '职能类 | 职能团队',
    city: '深圳市',
    posted: '2026-04-17',
    desc: CAMPUS_AMBASSADOR_DESC,
  },
  {
    title: 'AI 实习生-计算机视觉算法 (世界模型)',
    team: '技术类 | 研发团队',
    city: '深圳市，上海市',
    posted: '2026-04-13',
    desc: CV_ALGO_INTERN_DESC,
  },
  {
    title: 'AI 实习生-计算机视觉算法 (云端大模型)',
    team: '技术类 | 研发团队',
    city: '深圳市，上海市',
    posted: '2026-04-13',
    desc: CV_ALGO_INTERN_DESC,
  },
  {
    title: 'AI 实习生-计算机视觉算法 (三维重建)',
    team: '技术类 | 研发团队',
    city: '深圳市，上海市',
    posted: '2026-04-13',
    desc: CV_ALGO_INTERN_DESC,
  },
  {
    title: 'AI 实习生-计算机视觉算法 (动态感知)',
    team: '技术类 | 研发团队',
    city: '深圳市，上海市',
    posted: '2026-04-13',
    desc: CV_ALGO_INTERN_DESC,
  },
]

export function InternPositions() {
  return (
    <section
      id="intern-positions"
      className="relative z-20 max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <SectionEyebrow label="实习生岗位" tag="we.dji.com" />
        <h2 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
          校园招聘 · 实习生招聘
        </h2>
        <p className="mt-4 text-sm text-white/55 leading-relaxed">
          以下 <strong className="text-white/75 font-medium">AI 实习生</strong>{' '}
          上组：深圳/北京 AI 开发实习；下组：校园大使与视觉算法。详情见{' '}
          <a
            href={OFFICIAL_INTERNS}
            target="_blank"
            rel="noreferrer noopener"
            className="text-white/80 underline underline-offset-2 hover:text-white"
          >
            实习生招聘
          </a>
          。
        </p>
      </motion.div>

      <h3 className="mt-12 text-sm font-semibold tracking-wide text-white/70 uppercase">
        AI 实习生 · 深圳 / 北京（研发团队）
      </h3>
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {aiInternFromOfficial.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.06,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="liquid-glass rounded-2xl p-5 flex flex-col"
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
              {aiInternMeta.team}
            </p>
            <h3 className="mt-2 text-base font-semibold text-white leading-snug">
              {p.title}
            </h3>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-white/45">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {aiInternMeta.city}
            </p>
            <p className="mt-1 text-[11px] text-white/35 tabular-nums">
              列表日期 · {aiInternMeta.posted}
            </p>
            <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">
              {AI_INTERN_SHARED_DESC}
            </p>
          </motion.article>
        ))}
      </div>

      <h3 className="mt-14 text-sm font-semibold tracking-wide text-white/70">
        其他方向
      </h3>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherPositions.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.05,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="liquid-glass rounded-2xl p-5 flex flex-col"
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
              {p.team}
            </p>
            <h3 className="mt-2 text-base font-semibold text-white leading-snug">
              {p.title}
            </h3>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-white/45">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {p.city}
            </p>
            <p className="mt-1 text-[11px] text-white/35 tabular-nums">
              列表日期 · {p.posted}
            </p>
            <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">
              {p.desc}
            </p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 md:px-6"
      >
        <p className="text-sm text-white/55">以官网在招列表为准。</p>
        <a
          href={OFFICIAL_INTERNS}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 hover:bg-white/90 transition-colors"
        >
          前往实习生招聘专区
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-px" />
        </a>
      </motion.div>
    </section>
  )
}
