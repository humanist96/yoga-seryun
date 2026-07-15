import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle, X } from 'lucide-react'
import type { ScheduleEntry } from '../data/schedule'
import { LEVELS, LINKS } from '../data/content'
import { useFocusTrap } from '../lib/focusTrap'

interface ClassDetailSheetProps {
  entry: ScheduleEntry
  onClose: () => void
}

/**
 * 수업 상세 시트 — 시간표 셀·다가오는 수업 배너에서 열리는 예약 동선.
 * 모바일은 바텀 시트, 데스크톱은 중앙 다이얼로그로 나타난다. (기획서 C1)
 * 네이버 예약은 수업별 딥링크가 없어, 요청사항 메모 안내를 함께 보여준다.
 */
export default function ClassDetailSheet({ entry, onClose }: ClassDetailSheetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const level = LEVELS.find((item) => item.level === entry.level)
  useFocusTrap(containerRef)

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.day}요일 ${entry.time} ${entry.name} 수업 안내`}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-plum/30 backdrop-blur-[2px]" aria-hidden="true" />

      <motion.div
        className="relative w-full md:max-w-md bg-background rounded-t-3xl md:rounded-3xl px-6 pt-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] md:pb-7 shadow-2xl"
        initial={{ y: 48, opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div aria-hidden="true" className="md:hidden mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-xs tracking-[2px] uppercase text-muted-foreground tnum">
          {entry.day}요일 · {entry.time}
        </p>
        <h3 className="mt-1.5 font-serif text-2xl">{entry.name}</h3>

        <div className="mt-4 flex items-start gap-2.5">
          <span
            aria-hidden="true"
            className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${level?.dotClass ?? 'bg-muted'}`}
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium tnum">Lv.{entry.level}</span>
            {level && <> — {level.description}</>}
          </p>
        </div>

        {entry.teacher && (
          <p className="mt-2 text-sm text-muted-foreground">{entry.teacher} 선생님과 함께합니다.</p>
        )}

        <div className="mt-5 rounded-2xl bg-card p-4 text-xs text-muted-foreground leading-relaxed">
          첫 체험은 네이버 예약으로 신청 후, 요청사항에{' '}
          <span className="text-foreground font-medium">
            “{entry.day}요일 {entry.time} {entry.name} 희망”
          </span>
          이라고 남겨주시면 준비가 빨라져요. 예약비 1만원은 수업 참여 시 전액 환불됩니다.
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          <a
            href={LINKS.booking}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-accent text-white py-3.5 text-sm font-semibold"
          >
            <CalendarCheck className="w-4 h-4" aria-hidden="true" />이 시간에 체험 예약하기
          </a>
          <a
            href={LINKS.naverTalk}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium text-foreground hover:bg-card transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            톡톡으로 먼저 물어보기
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
