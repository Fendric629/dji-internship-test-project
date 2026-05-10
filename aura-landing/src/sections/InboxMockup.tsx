import { motion } from 'motion/react'
import {
  Archive,
  FileEdit,
  Forward,
  Inbox,
  MoreHorizontal,
  Paperclip,
  Reply,
  Search,
  Send,
  Star,
  Trash2,
} from 'lucide-react'

type Msg = {
  name: string
  subject: string
  preview: string
  time: string
  unread?: boolean
  active?: boolean
}

const messages: Msg[] = [
  {
    name: '大疆招聘',
    subject: '【暑期实习】面试邀请 · 前端AI coding',
    preview: '您好，邀请您于本周四 14:00 参加视频面试，请提前安装会议客户端…',
    time: '9:41',
    unread: true,
    active: true,
  },
  {
    name: '大疆 HR',
    subject: '实习生线上测评提醒（48 小时内有效）',
    preview: '您投递的岗位已触发测评链接，请在截止时间前完成逻辑与情景题…',
    time: '8:12',
    unread: true,
  },
  {
    name: '导师计划',
    subject: '欢迎加入飞控组实习 — 首周安排',
    preview: '附件为代码规范与内网权限申请指引，mentor 将在周一 10:00 与你 sync…',
    time: '昨天',
  },
  {
    name: '行政服务',
    subject: '深圳总部实习工牌与门禁开通进度',
    preview: '照片已审核通过，请于报到当日在 B1 服务台领取工牌…',
    time: '昨天',
  },
  {
    name: '大疆大学',
    subject: '新人必修：信息安全与合规课程',
    preview: '请在入职首周完成线上课程，完成后系统将自动记录学时…',
    time: '周一',
  },
  {
    name: '企业文化',
    subject: '实习生分享会回放 · 「我的第一个量产项目」',
    preview: '上周四晚的分享已生成回放链接与课件，欢迎按需观看…',
    time: '周一',
  },
]

export function InboxMockup() {
  return (
    <section className="relative z-20 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center text-xs text-white/50">
            邮件 — 收件箱（示意）
          </div>
          <div className="w-16" aria-hidden />
        </div>

        <div className="grid grid-cols-12 h-[520px] text-left text-sm">
          <aside className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-white/10 bg-black/30 p-4 flex flex-col gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2"
            >
              <FileEdit className="w-3.5 h-3.5" />
              写邮件
            </button>

            <nav className="flex flex-col gap-0.5">
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-xs bg-white/10 text-white"
              >
                <Inbox className="w-4 h-4 opacity-80" />
                <span className="flex-1 text-left font-medium">收件箱</span>
                <span className="text-white/50">12</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-white/60 hover:bg-white/5"
              >
                <Star className="w-4 h-4" />
                <span className="flex-1 text-left">星标</span>
                <span className="text-white/40">3</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-white/60 hover:bg-white/5"
              >
                <Send className="w-4 h-4" />
                <span className="flex-1 text-left">已发送</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-white/60 hover:bg-white/5"
              >
                <FileEdit className="w-4 h-4" />
                <span className="flex-1 text-left">草稿</span>
                <span className="text-white/40">2</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-white/60 hover:bg-white/5"
              >
                <Archive className="w-4 h-4" />
                <span className="flex-1 text-left">归档</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-white/60 hover:bg-white/5"
              >
                <Trash2 className="w-4 h-4" />
                <span className="flex-1 text-left">废纸篓</span>
              </button>
            </nav>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
                标签
              </p>
              <div className="flex gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#00d2ff' }}
                  title="面试"
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#A4F4FD' }}
                  title="入职"
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#f59e0b' }}
                  title="测评"
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#10b981' }}
                  title="培训"
                />
              </div>
            </div>
          </aside>

          <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 flex flex-col min-h-0">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 text-white/50">
              <Search className="w-4 h-4 shrink-0" />
              <span className="text-xs">搜索邮件</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {messages.map((m) => (
                <button
                  key={m.name + m.subject}
                  type="button"
                  className={`w-full text-left px-3 py-3 border-b border-white/5 hover:bg-white/[0.04] transition-colors ${
                    m.active ? 'bg-white/[0.06] border-l-2 border-l-[#00d2ff]' : ''
                  }`}
                >
                  <div className="flex justify-between gap-2 mb-1">
                    <span
                      className={`text-xs ${m.unread ? 'font-semibold text-white' : 'text-white/80'}`}
                    >
                      {m.name}
                    </span>
                    <span className="text-[10px] text-white/40 shrink-0">
                      {m.time}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate ${m.unread ? 'text-white/90 font-medium' : 'text-white/70'}`}
                  >
                    {m.subject}
                  </p>
                  <p className="text-[11px] text-white/45 truncate mt-0.5">
                    {m.preview}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col bg-black/20 min-h-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/80"
                  aria-label="回复"
                >
                  <Reply className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/80"
                  aria-label="转发"
                >
                  <Forward className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/80"
                  aria-label="归档"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/80"
                  aria-label="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/80"
                aria-label="更多"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <h3 className="text-lg font-semibold text-white leading-tight">
                【暑期实习】面试邀请 · 前端AI coding
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] flex items-center justify-center text-xs font-semibold text-white">
                  招
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">大疆招聘</p>
                  <p className="text-xs text-white/50">发件人 · 9:41</p>
                </div>
                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/80 border border-white/10">
                  面试
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
                  日历备注
                </p>
                <p className="mt-2 text-xs text-white/75 leading-relaxed">
                  视频面试：本周四 14:00—15:00。请准备身份证件、作品集链接，并提前 10
                  分钟进入会议室测试音视频。
                </p>
              </div>

              <div className="space-y-3 text-sm text-white/80 leading-relaxed">
                <p>同学，你好！</p>
                <p>
                  感谢投递大疆暑期实习（前端AI coding）。经过简历筛选，我们诚挚邀请你参加下一轮视频面试，与业务导师聊聊你的项目经历与技术思考。
                </p>
                <p>
                  会议链接与会议号见本邮件下方；若时间冲突，请在 24
                  小时内回复本邮件说明可面试时间，我们将尽量协调。
                </p>
                <p>
                  预祝你面试顺利，也欢迎提前了解大疆在 Web 前端、智能化研发工具与硬件生态结合方向的技术公开信息，以便更有针对性地交流。
                </p>
                <p className="text-white/50">— 大疆招聘团队</p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
                <Paperclip className="w-3.5 h-3.5" />
                面试须知-暑期实习-示意.pdf
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
