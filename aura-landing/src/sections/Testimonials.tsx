const items = [
  {
    quote:
      '暑期在前端与智能化工具链相关岗位实习四个月，从组件库到 AI 辅助编码流程都接触过。邮件里那条「首周安排」我现在还记得——节奏快，但有人带。',
    name: '匿名实习生',
    role: '前端AI coding · 示意证言',
    company: '过往分享整理',
  },
  {
    quote:
      '测评和面试通知全堆在收件箱里很容易漏。自己用标签分好类之后，基本没再错过 HR 的截止时间。',
    name: '匿名实习生',
    role: '嵌入式方向 · 示意证言',
    company: '过往分享整理',
  },
  {
    quote:
      '导师每周固定 office hour，项目不是打杂，是真的要进版本讨论的。转正答辩前团队会帮你对齐预期。',
    name: '匿名实习生',
    role: '产品设计方向 · 示意证言',
    company: '过往分享整理',
  },
]

export function Testimonials() {
  return (
    <section
      id="voices"
      className="relative z-20 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t) => (
          <figure key={t.name + t.role} className="liquid-glass rounded-2xl p-6">
            <blockquote className="text-sm text-white/80 leading-[1.6]">
              「{t.quote}」
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/10">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-xs text-white/50 mt-1">{t.role}</p>
              <p className="text-xs text-white font-semibold tracking-wide mt-2">
                {t.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
