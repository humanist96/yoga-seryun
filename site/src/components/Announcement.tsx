import { ANNOUNCEMENT } from '../data/content'

const isActive = (until: string): boolean => {
  const todayKst = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
  return todayKst <= until
}

/** 공지 배너 — content.ts의 ANNOUNCEMENT가 있고 기간 내일 때만 Navbar 아래 노출 (기획서 D2) */
export default function Announcement() {
  if (!ANNOUNCEMENT || !isActive(ANNOUNCEMENT.until)) return null

  const body = (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
      {ANNOUNCEMENT.message}
      {ANNOUNCEMENT.href && <span aria-hidden="true">→</span>}
    </span>
  )

  return (
    <div className="border-t border-border/40 bg-accent-soft/60 backdrop-blur-sm text-accent-deep text-xs text-center">
      {ANNOUNCEMENT.href ? (
        <a
          href={ANNOUNCEMENT.href}
          target="_blank"
          rel="noreferrer"
          className="block px-4 py-2 hover:bg-accent-soft transition-colors"
        >
          {body}
        </a>
      ) : (
        <p className="px-4 py-2">{body}</p>
      )}
    </div>
  )
}
