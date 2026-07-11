import Logo from './Logo'
import { LINKS } from '../data/content'

const CHANNELS = [
  { label: 'Instagram', href: LINKS.instagram },
  { label: 'Blog', href: LINKS.blog },
  { label: 'YouTube', href: LINKS.youtube },
] as const

export default function Footer() {
  return (
    <footer className="bg-plum text-plum-foreground/70 py-14 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Logo className="w-6 h-6 text-accent" />
          <div>
            <p className="text-plum-foreground text-sm font-medium">요가명상,세련 마곡나루점</p>
            <p className="text-xs">SR : A Space To Restore</p>
          </div>
        </div>

        <ul className="flex items-center gap-5 text-sm">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-plum-foreground transition-colors"
              >
                {channel.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs">© 2026 요가명상,세련. All rights reserved.</p>
      </div>
    </footer>
  )
}
