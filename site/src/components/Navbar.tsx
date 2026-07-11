import { motion } from 'framer-motion'
import Logo from './Logo'
import { LINKS } from '../data/content'

const NAV_ITEMS = [
  { label: '수업', href: '#classes' },
  { label: '시간표', href: '#schedule' },
  { label: '가격', href: '#pricing' },
  { label: '공간', href: '#space' },
  { label: '오시는길', href: '#visit' },
] as const

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-background/90 to-transparent">
      <nav className="flex items-center justify-between px-5 md:px-16 lg:px-24 py-4">
        <a href="#top" className="flex items-center gap-2 text-foreground">
          <Logo className="w-7 h-7 text-accent" />
          <span className="font-serif text-lg tracking-tight">요가명상,세련</span>
        </a>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href={LINKS.booking}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="liquid-glass rounded-full px-5 py-2.5 text-sm font-medium text-accent-deep"
        >
          첫 수업 무료 체험
        </motion.a>
      </nav>
    </header>
  )
}
