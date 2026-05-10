import { useState } from 'react'
import {
  Archive,
  ChevronRight,
  Forward,
  Inbox,
  Menu,
  MoreHorizontal,
  Paperclip,
  Reply,
  Search,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react'
import { motion } from 'motion/react'
import './App.css'

const navLinks = [
  { label: '首页概览', href: '#hero' },
  { label: '岗位简介', href: '#roles' },
  { label: '准备流程', href: '#flow' },
  { label: '成长收获', href: '#growth' },
]
const menuItems = ['首页', '项目', '经验', '作品集', '简历', '帮助']
const logos = ['DJI', '大疆视觉算法', '大疆无人机', '大疆云台', '大疆影像', '大疆农业', '大疆教育', '大疆创新']

const messages = [
  {
    name: '导师李工',
    subject: '关于图传链路优化的讨论',
    preview: '你整理的延迟分析很清晰，我们可以继续压缩首帧时间。',
    time: '9:41 AM',
    unread: true,
    active: true,
  },
  {
    name: 'HR 严老师',
    subject: '大疆实习面试安排确认',
    preview: '请确认下周三下午的面试时间，我们会发送会议链接。',
    time: '8:12 AM',
    unread: true,
  },
  {
    name: '视觉算法组',
    subject: 'Re: 数据集标注规范更新',
    preview: '新增了动态遮挡场景的标注规则，建议你补充到实验记录。',
    time: '昨天',
  },
  {
    name: '飞书通知',
    subject: '实习周报已提交',
    preview: '你本周的目标完成率为 92%，可继续推进实验复现。',
    time: '昨天',
  },
  {
    name: '代码评审',
    subject: 'DJI Vision Pipeline PR #18 已合并',
    preview: '修复了推理模块中的线程同步问题，性能提升 14%。',
    time: '周一',
  },
  {
    name: '项目经理',
    subject: '下周例会：无人机影像稳定性评审',
    preview: '请带上最近一次测试结果和优化建议。',
    time: '周一',
  },
]

const triageItems = [
  {
    title: '优先处理 4',
    color: '#ffffff',
    items: ['面试时间确认', '导师反馈：图传链路优化'],
  },
  {
    title: '待跟进 7',
    color: '#e5e5e5',
    items: ['周报修改', '数据集标注规范更新'],
  },
  {
    title: '项目更新 18',
    color: '#a3a3a3',
    items: ['PR 合并通知', '测试结果同步'],
  },
  {
    title: '已归档 13',
    color: '#525252',
    items: ['会议纪要 · 报销单 · 培训资料'],
  },
]

const internshipRoles = [
  {
    title: '视觉算法实习生',
    team: '视觉 / 算法',
    desc: '围绕图像理解、目标检测、跟踪、重建、增强与模型优化开展工作，支持无人机影像与智能感知相关场景。',
    details: [
      '参与数据分析、模型训练、评估和实验复现',
      '优化算法性能、精度与推理效率',
      '协助完成工程落地和结果验证',
      '关注图像处理、深度学习与 C++ / Python 实现',
    ],
    tags: ['图像处理', '深度学习', '模型优化'],
  },
  {
    title: '软件开发实习生',
    team: '软件 / 平台',
    desc: '面向客户端、工具链、业务平台和基础架构方向，负责功能开发、系统联调、性能优化与问题排查。',
    details: [
      '参与需求分析、功能设计与开发实现',
      '维护高质量代码与测试流程',
      '配合产品、算法或硬件团队完成联调',
      '关注工程能力、调试能力与协作效率',
    ],
    tags: ['工程实现', '系统联调', '性能优化'],
  },
  {
    title: '机器人 / 嵌入式实习生',
    team: '机器人 / 控制',
    desc: '围绕控制算法、运动规划、传感器融合、嵌入式系统与飞控相关模块展开，支持硬件协同与功能验证。',
    details: [
      '参与控制与运动相关模块开发',
      '完成传感器数据处理和系统测试',
      '支持嵌入式平台和实时系统优化',
      '关注数学基础、控制理论和硬件理解',
    ],
    tags: ['控制算法', '嵌入式', '系统测试'],
  },
]

const gradientStyle = {
  backgroundImage:
    'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text' as const,
  backgroundClip: 'text' as const,
  color: 'transparent',
  WebkitTextFillColor: 'transparent' as const,
  filter: 'url(#c3-noise)',
}

function AppleLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="white" aria-hidden="true">
      <path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z" />
    </svg>
  )
}

function AppleButton({ label = '立即查看', full = false }: { label?: string; full?: boolean }) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] ${full ? 'w-full' : ''}`}
    >
      <AppleLogo className="w-4 h-4" />
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[1px]" />
    </button>
  )
}

function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/70">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      <span>{label}</span>
      {tag ? <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50 text-xs">{tag}</span> : null}
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="c3-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <main className="relative z-10">
        <header className="max-w-6xl mx-auto px-6 py-6">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-white">
              <LogoMark />
            </div>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.45 }}
                  className="text-white/70 text-sm font-medium hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block" />
              <button className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </motion.nav>
        </header>

        <section id="hero" className="pt-16 md:pt-28 pb-20 text-center flex flex-col items-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9] max-w-4xl"
          >
            <span className="block">从大疆实习开始</span>
            <span className="block animate-shiny" style={gradientStyle}>
              开启面向未来的职业准备
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 text-white/60 max-w-md text-base leading-[1.6]"
          >
            这是一个面向大疆实习准备的页面，聚焦项目展示、岗位匹配、面试训练和实习成长，帮助你更清晰地组织申请材料。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <p className="text-xs text-white/40">适用于算法 / 软件 / 视觉 / 机器人相关岗位</p>
          </motion.div>
        </section>
      </main>

      <section className="relative z-10 h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-3 text-white/85 font-semibold">
            <AppleLogo className="w-3.5 h-3.5" />
            <span>DJI Internship</span>
            <div className="flex items-center gap-4 text-white/55 font-medium">
              {menuItems.map((item, index) => (
                <span
                  key={item}
                  className={`${index > 2 ? 'hidden sm:inline' : ''} ${index > 3 ? 'hidden md:inline' : ''}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Search className="w-3.5 h-3.5" />
            <span>实习准备周 · 9:00 AM</span>
          </div>
        </motion.div>
      </section>

      <section id="flow" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
        >
          <div className="h-11 border-b border-white/10 flex items-center justify-center relative bg-black/20">
            <div className="absolute left-4 flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="text-xs text-white/50">DJI 实习准备面板</div>
          </div>
          <div className="grid grid-cols-12 h-[520px]">
            <aside className="col-span-3 border-r border-white/10 bg-black/30 p-4 flex flex-col gap-5">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2 w-fit">
                <Sparkles className="w-4 h-4" />
                生成实习申请稿
              </button>
              <div className="space-y-1">
                {[
                  [Inbox, '投递箱', '12', true],
                  [Star, '重点岗位', '3', false],
                  [Forward, '已投递', '', false],
                  [Archive, '待完善', '2', false],
                  [Archive, '已归档', '', false],
                  [Trash2, '移除', '', false],
                ].map(([Icon, label, count, active]) => (
                  <button
                    key={label as string}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{label as string}</span>
                    {count ? <span className="text-xs text-white/40">{count as string}</span> : null}
                  </button>
                ))}
              </div>
              <div className="mt-auto">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">方向标签</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                  {[
                    ['#00d2ff', '算法'],
                    ['#A4F4FD', '软件'],
                    ['#f59e0b', '视觉'],
                    ['#10b981', '机器人'],
                  ].map(([color, label]) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="col-span-4 border-r border-white/10 bg-black/20 flex flex-col">
              <div className="p-4 border-b border-white/10 flex items-center gap-2 text-white/35">
                <Search className="w-4 h-4" />
                <span className="text-sm">搜索大疆实习相关邮件</span>
              </div>
              <div className="overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.subject}
                    className={`px-4 py-4 border-b border-white/5 ${message.active ? 'bg-white/6' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white">{message.name}</h3>
                          {message.unread ? <span className="w-2 h-2 rounded-full bg-[#00d2ff]" /> : null}
                        </div>
                        <p className="text-sm text-white mt-1 truncate">{message.subject}</p>
                        <p className="text-xs text-white/45 mt-1 leading-5">{message.preview}</p>
                      </div>
                      <span className="text-xs text-white/35 whitespace-nowrap">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-5 bg-black/10 flex flex-col">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {[Reply, Forward, Archive, Trash2].map((Icon, index) => (
                    <button key={index} className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/70">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
                <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/70">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">大疆实习周报</h2>
                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] flex items-center justify-center font-semibold text-white">
                      DJI
                    </div>
                    <div>
                      <div className="text-white">视觉算法组导师</div>
                      <div className="text-white/45 text-xs">发给我 · 9:41 AM</div>
                    </div>
                    <span className="ml-auto px-2.5 py-1 rounded-full border border-white/10 text-xs text-white/60">实习</span>
                  </div>
                </div>
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#A4F4FD]">
                    <Sparkles className="w-4 h-4" />
                    本周建议
                  </div>
                  <p className="mt-2 text-sm text-white/70 leading-6">
                    把你的项目重点放在“问题定义、方案设计、结果量化”三部分，面试时尤其要说明你在图传、稳定性或算法提效上的具体贡献。
                  </p>
                </div>
                <div className="space-y-4 text-sm leading-7 text-white/75">
                  <p>同学你好，</p>
                  <p>
                    如果你在准备大疆实习，建议优先关注与岗位最相关的能力：算法岗看建模与实验设计，软件岗看工程实现与协作，视觉岗看图像处理与优化，机器人岗看系统理解与调试能力。
                  </p>
                  <p>
                    本周建议你完成一版简洁的简历、整理 1-2 个能讲清楚的项目，并准备好“为什么选择大疆”“你做过最有挑战的项目是什么”等高频问题。
                  </p>
                  <p>如果你愿意，我可以继续帮你把简历和项目经历改成更像大疆实习投递风格的版本。</p>
                  <p className="text-white/50">— 实习准备助手</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 hover:bg-white/5">
                  <Paperclip className="w-4 h-4" />
                  大疆实习准备清单.pdf
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="growth" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionEyebrow label="实习方向" tag="DJI" />
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
              把大疆实习
              <br />
              准备成一个清晰故事
            </h2>
            <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
              从岗位匹配到项目表达，从面试题到周报复盘，把你在大疆实习中的成长路径整理成一份可展示、可复用、可迭代的申请内容。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['岗位匹配', '项目亮点', '面试准备', '周报复盘'].map((item) => (
                <span key={item} className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
          <div className="liquid-glass rounded-2xl p-5 border border-white/10">
            <div className="text-xs text-white/45">本周进度 · 已整理 42 条准备项</div>
            <div className="mt-4 grid gap-3">
              {triageItems.map((item) => (
                <div key={item.title} className="liquid-glass rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: item.color }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.title}
                  </div>
                  <div className="mt-2 text-xs text-white/55 space-y-1">
                    {item.items.map((row) => (
                      <div key={row}>{row}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="growth" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-xs uppercase tracking-widest text-white/40 text-center">适合投递大疆实习的能力方向</div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
              className="text-sm font-semibold tracking-tight text-white/50 hover:text-white"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['这份实习准备页面帮我把“项目—岗位—面试”串起来了，投递大疆时表达清晰很多。', '小周', '计算机专业 · 视觉方向', 'DJI 视觉'],
            ['我最需要的是怎么把项目讲得更像大疆实习生，这里的结构非常实用。', '林同学', '电子信息 · 软件方向', 'DJI 软件'],
            ['从周报到简历再到面试题，整个页面很适合做实习申请前的自查清单。', '陈同学', '自动化 · 机器人方向', 'DJI 机器人'],
          ].map(([quote, name, role, company]) => (
            <figure key={name as string} className="liquid-glass rounded-2xl p-6 border border-white/10">
              <blockquote className="text-sm text-white/80 leading-[1.6]">“{quote}”</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10">
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-white/50">{role}</div>
                <div className="text-xs text-white font-semibold tracking-wide mt-1">{company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="roles" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <SectionEyebrow label="实习岗位简介" tag="DJI Campus Recruiting" />
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02] max-w-3xl">
            了解岗位职责与能力要求
            <br />
            选择适合你的大疆实习方向
          </h2>
          <p className="mt-5 text-white/60 max-w-2xl leading-[1.6]">
            以下岗位简介按照校园招聘实习岗位的常见展示方式整理，重点说明工作内容、基础要求和适配方向，便于快速了解岗位差异。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {internshipRoles.map((role, index) => (
            <motion.article
              key={role.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="liquid-glass rounded-3xl p-6 md:p-7 border border-white/10 bg-black/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/45 uppercase tracking-[0.18em]">{role.team}</div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{role.title}</h3>
                </div>
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-white/70" />
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/65">{role.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/70">
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3">
                {role.details.map((detail) => (
                  <li key={detail} className="flex gap-3 text-sm text-white/80 leading-6">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00d2ff] shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
                <span>校园招聘 · 实习岗位</span>
                <button className="inline-flex items-center gap-1 text-white/85 hover:text-white">
                  查看详情
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-14 md:py-20"
        >
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)' }} />
          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div className="text-center lg:text-left">
              <h2
                className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02] animate-shiny"
                style={gradientStyle}
              >
                从你的想象
                <br />
                到世界现象
              </h2>
              <p className="mt-6 text-white/60 max-w-xl mx-auto lg:mx-0 text-sm md:text-base leading-[1.7]">
                把创意变成可落地的结果，把想法变成能被看见的作品。无论是项目、简历还是实习经历，都可以从这里开始被重新组织。
              </p>
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                {['项目表达', '岗位匹配', '面试准备', '结果呈现'].map((item) => (
                  <span key={item} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="liquid-glass rounded-2xl p-5 border border-white/10 bg-black/25">
                <div className="text-xs text-white/45 uppercase tracking-[0.18em]">准备状态</div>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-3xl font-semibold">94%</div>
                    <div className="text-sm text-white/55 mt-1">完成度</div>
                  </div>
                  <div className="text-right text-xs text-white/45">
                    <div>项目已整理</div>
                    <div>面试题已复盘</div>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#0B2551] via-[#A4F4FD] to-[#00d2ff]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ['01', '项目故事', '清晰表达问题与成果'],
                  ['02', '岗位适配', '匹配岗位能力要求'],
                  ['03', '面试准备', '形成高频题答案'],
                  ['04', '持续迭代', '根据反馈不断优化'],
                ].map(([index, title, desc]) => (
                  <div key={title} className="liquid-glass rounded-2xl p-4 border border-white/10 bg-black/20">
                    <div className="text-xs text-white/35">{index}</div>
                    <div className="mt-2 font-semibold text-sm">{title}</div>
                    <div className="mt-2 text-xs text-white/50 leading-5">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
