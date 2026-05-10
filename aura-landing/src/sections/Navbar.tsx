import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { LogoMark, PrimaryCta } from '../components/primitives'

const links = [
  { label: '实习与项目', href: '#internship' },
  { label: '体验示意', href: '#solutions' },
  { label: '团队证言', href: '#voices' },
  { label: '产品生态', href: '#ecosystem' },
  { label: '常见问题', href: '#internship' },
]

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-20 max-w-6xl mx-auto px-6 flex items-center justify-between py-6"
    >
      <a href="#" className="shrink-0" aria-label="首页">
        <LogoMark />
      </a>

      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {links.map((link, i) => (
          <motion.a
            key={link.href + link.label}
            href={link.href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + i * 0.05,
              duration: 0.5,
              ease: 'easeOut',
            }}
            className="text-white/70 text-sm font-medium hover:text-white"
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <PrimaryCta />
        </div>
        <button
          type="button"
          className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white"
          aria-label="打开菜单"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </motion.nav>
  )
}
