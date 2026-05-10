import { motion } from 'motion/react'
import { SectionEyebrow } from '../components/primitives'

const highlights = [
  {
    title: '你可能参与的方向',
    body:
      '消费级无人机与手持影像、行业飞行器与负载、芯片与嵌入式、软件与云服务、供应链与制造等——具体开放岗位以当季官网为准。',
  },
  {
    title: '典型流程（示意）',
    body:
      '在线投递 → 简历筛选 → 线上测评或笔试 → 业务面试 → 录用沟通。不同职位环节可能略有差异。',
  },
  {
    title: '实习体验',
    body:
      '双选导师、周例会与代码评审、跨团队评审旁听等均为常见安排；能否转正取决于编制与个人表现，以当时政策为准。',
  },
]

const checklist = [
  '关注官方招聘网站与公众号，避免通过非授权渠道投递',
  '仔细阅读职位描述中的硬技能与加分项，作品集链接保持可访问',
  '测评与面试邀请常带时效，建议使用日历提醒',
  '保护个人信息：勿向私人账号转账或透露验证码',
]

export function DjiInternship() {
  return (
    <section
      id="internship"
      className="relative z-20 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <SectionEyebrow label="校园与实习" tag="大疆" />
        <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
          了解大疆实习
        </h2>
        <p className="mt-5 text-white/55 text-sm md:text-base leading-relaxed">
          以下为通用介绍与防诈提示，便于你准备申请。所有截止时间、职位列表与面试结果，均以{' '}
          <strong className="text-white/80 font-medium">大疆官方招聘渠道</strong>{' '}
          发布为准，本页面不代为收简历、不承诺录用。
        </p>
      </motion.div>

      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass rounded-2xl p-6"
          >
            <h3 className="text-base font-semibold text-white">{h.title}</h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">{h.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.55 }}
        className="mt-10 liquid-glass rounded-2xl p-6 md:p-8"
      >
        <h3 className="text-sm font-semibold text-white/90">投递前可自查</h3>
        <ul className="mt-4 space-y-3 text-sm text-white/60 leading-relaxed">
          {checklist.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
