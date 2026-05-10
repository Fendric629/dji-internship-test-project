import { motion } from 'motion/react'
import {
  Archive,
  Mail,
  PenLine,
  Reply,
  Search,
  Trash2,
} from 'lucide-react'

const toolbar = [
  { label: '写邮件', icon: PenLine, hide: false },
  { label: '回复', icon: Reply, hide: false },
  { label: '归档', icon: Archive, hide: 'sm' as const },
  { label: '删除', icon: Trash2, hide: 'md' as const },
]

export function MenuBarStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 w-full bg-[#0a0c10]/90 backdrop-blur-md border-y border-white/10 shadow-lg shadow-black/20"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/90">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
            <Mail className="w-4 h-4" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white leading-tight truncate">
              邮件
            </p>
            <p className="text-[10px] text-white/45 truncate">
              收件箱 · 企业邮箱
            </p>
          </div>
          <span className="hidden sm:block h-6 w-px bg-white/10 shrink-0 mx-1" />
          <div className="hidden sm:flex items-center gap-1">
            {toolbar.map((t, i) => {
              const Icon = t.icon
              const hidden =
                t.hide === 'sm'
                  ? 'hidden md:flex'
                  : t.hide === 'md'
                    ? 'hidden lg:flex'
                    : 'flex'
              return (
                <button
                  key={t.label}
                  type="button"
                  className={`${hidden} items-center gap-1 rounded-md px-2 py-1.5 text-white/75 hover:bg-white/10 hover:text-white transition-colors ${i > 1 ? '' : ''}`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden />
                  <span className="hidden lg:inline">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/60 shrink-0">
          <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 flex-1 sm:flex-initial sm:min-w-[140px]">
            <Search className="w-3.5 h-3.5 shrink-0" aria-hidden />
            <span className="truncate text-[11px]">搜索邮件</span>
          </div>
          <span className="tabular-nums text-white/50 text-[11px] whitespace-nowrap">
            5月6日 周三 13:09
          </span>
        </div>
      </div>
    </motion.div>
  )
}
