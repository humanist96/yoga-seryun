import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import { fadeUp } from '../lib/motion'
import {
  DAYS,
  TIMES,
  SCHEDULE,
  findNextClassInfo,
  todayKstDay,
  type Day,
  type ScheduleEntry,
} from '../data/schedule'
import { LEVELS, LINKS } from '../data/content'
import ClassDetailSheet from './ClassDetailSheet'

const dotClassFor = (level: number): string =>
  LEVELS.find((item) => item.level === level)?.dotClass ?? 'bg-muted'

function useNextClassInfo() {
  return useMemo(() => findNextClassInfo(new Date()), [])
}

/** "40분 후" · "약 3시간 후" — 조급함을 주지 않는 굵은 단위 표기 */
const remainLabel = (minutes: number): string =>
  minutes < 60 ? `${minutes}분 후` : `약 ${Math.round(minutes / 60)}시간 후`

interface CellProps {
  day: Day
  time: (typeof TIMES)[number]
  isNext: boolean
  onSelect: (entry: ScheduleEntry) => void
}

function ClassCell({ day, time, isNext, onSelect }: CellProps) {
  const entry = SCHEDULE.find((item) => item.day === day && item.time === time)

  if (!entry) {
    return (
      <div className="rounded-xl border border-dashed border-border/70 min-h-20 flex items-center justify-center">
        <span className="text-xs text-muted-foreground/60">수업 없음</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(entry)}
      aria-label={`${day}요일 ${time} ${entry.name} 수업 안내 보기`}
      className={`group relative w-full text-left rounded-xl bg-card p-3 min-h-20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-14px_rgba(188,92,116,0.4)] ${
        isNext ? 'ring-2 ring-accent' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">{entry.name}</p>
        <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${dotClassFor(entry.level)}`} />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="tnum">Lv.{entry.level}</span>
        {entry.teacher && <span>{entry.teacher} 선생님</span>}
      </div>
      {isNext && <p className="mt-1 text-[11px] font-medium text-accent-deep">다가오는 수업</p>}
      <ChevronRight
        aria-hidden="true"
        className="absolute right-2 bottom-2 w-3.5 h-3.5 text-accent/0 transition-colors duration-300 group-hover:text-accent/70"
      />
    </button>
  )
}

/** 다가오는 수업 라이브 배너 — findNextClassInfo 결과를 문장으로 (기획서 C2) */
function NextClassBanner({ onSelect }: { onSelect: (entry: ScheduleEntry) => void }) {
  const info = useNextClassInfo()
  if (!info) return null

  const { entry, dayOffset, minutesUntil } = info
  const when =
    dayOffset === 0
      ? `오늘 ${entry.time}`
      : dayOffset === 1
        ? `내일 ${entry.time}`
        : `${entry.day}요일 ${entry.time}`

  return (
    <motion.div {...fadeUp(0.15)} className="mb-10 flex justify-center px-1">
      <button
        type="button"
        onClick={() => onSelect(entry)}
        className="group liquid-glass rounded-full pl-4 pr-3 py-2.5 flex items-center gap-2.5 text-sm hover:shadow-[0_10px_30px_-12px_rgba(188,92,116,0.35)] transition-shadow"
      >
        <Sparkles className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
        <span className="text-foreground text-left">
          <span className="tnum font-medium">{when}</span> {entry.name}
          {entry.teacher && <span className="text-muted-foreground"> · {entry.teacher} 선생님</span>}
          {dayOffset === 0 && (
            <span className="text-accent-deep font-medium"> · {remainLabel(minutesUntil)} 시작</span>
          )}
        </span>
        <span className="hidden sm:inline text-muted-foreground shrink-0">· 체험 가능</span>
        <ChevronRight
          className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0"
          aria-hidden="true"
        />
      </button>
    </motion.div>
  )
}

function MobileSchedule({
  nextKey,
  onSelect,
}: {
  nextKey: string
  onSelect: (entry: ScheduleEntry) => void
}) {
  const [selectedDay, setSelectedDay] = useState<Day>(() => todayKstDay(new Date()))

  return (
    <div className="md:hidden">
      <div className="liquid-glass rounded-full p-1.5 flex justify-between">
        {DAYS.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDay(day)}
            aria-pressed={selectedDay === day}
            className={`flex-1 rounded-full py-2 text-sm transition-colors ${
              selectedDay === day
                ? 'bg-foreground text-background font-medium'
                : 'text-muted-foreground'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {TIMES.map((time) => (
          <div key={time} className="flex gap-3 items-stretch">
            <span className="w-14 shrink-0 pt-3 text-sm text-muted-foreground tnum">{time}</span>
            <div className="flex-1">
              <ClassCell
                day={selectedDay}
                time={time}
                isNext={nextKey === `${selectedDay}-${time}`}
                onSelect={onSelect}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DesktopSchedule({
  nextKey,
  onSelect,
}: {
  nextKey: string
  onSelect: (entry: ScheduleEntry) => void
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <div className="grid grid-cols-[4rem_repeat(6,1fr)] gap-2 min-w-[720px]">
        <div />
        {DAYS.map((day) => (
          <p key={day} className="text-center text-sm text-muted-foreground py-2">
            {day}
          </p>
        ))}
        {TIMES.map((time, timeIndex) => (
          <div key={time} className="contents">
            <p className="text-sm text-muted-foreground tnum pt-4">{time}</p>
            {DAYS.map((day, dayIndex) => (
              <motion.div key={`${day}-${time}`} {...fadeUp(timeIndex * 0.12 + dayIndex * 0.04)}>
                <ClassCell
                  day={day}
                  time={time}
                  isNext={nextKey === `${day}-${time}`}
                  onSelect={onSelect}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Schedule() {
  const nextInfo = useNextClassInfo()
  const nextKey = nextInfo ? `${nextInfo.entry.day}-${nextInfo.entry.time}` : ''
  const [activeEntry, setActiveEntry] = useState<ScheduleEntry | null>(null)

  return (
    <section id="schedule" className="border-t border-border/60 py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          class schedule
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 mb-8 font-serif text-3xl md:text-5xl text-center">
          이번 주의 수련
        </motion.h2>

        <NextClassBanner onSelect={setActiveEntry} />

        <motion.div {...fadeUp(0.2)}>
          <MobileSchedule nextKey={nextKey} onSelect={setActiveEntry} />
          <DesktopSchedule nextKey={nextKey} onSelect={setActiveEntry} />
        </motion.div>

        <motion.p {...fadeUp(0.25)} className="mt-5 text-center text-xs text-muted-foreground">
          수업을 누르면 안내와 함께 바로 체험 예약으로 이어집니다.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-8 space-y-2 text-sm text-muted-foreground">
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            <div className="rounded-2xl bg-card p-5">
              <p className="text-xs tracking-[2px] uppercase text-accent-deep">weekday 14–17</p>
              <p className="mt-2 font-medium text-foreground">개인레슨 · 특화프로그램 · 강사반</p>
              <p className="mt-1.5 text-xs leading-relaxed">
                1:1 맞춤 수련과 임산부 요가, 암케어 테라피 등 특화 프로그램이 평일 낮에 진행됩니다.
              </p>
              <a
                href={LINKS.naverTalk}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs font-medium text-accent-deep underline underline-offset-4"
              >
                톡톡으로 상담하기
              </a>
            </div>
            <div className="rounded-2xl bg-card p-5">
              <p className="text-xs tracking-[2px] uppercase text-accent-deep">sunday special</p>
              <p className="mt-2 font-medium text-foreground">스페셜 명상</p>
              <p className="mt-1.5 text-xs leading-relaxed">
                야외 명상, 테마 명상, 원데이 클래스가 일요일에 비정기로 열립니다. 일정은 공지로
                안내드려요.
              </p>
              <a
                href={LINKS.naverTalk}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs font-medium text-accent-deep underline underline-offset-4"
              >
                다음 일정 물어보기
              </a>
            </div>
          </div>
          <p>
            수업은 60분간 진행되며 강의실 입장은 20분 전부터 가능합니다. 임산부, 간질(뇌전증),
            심혈관질환, 정신과적 치료 중인 분은 참여 전 담당 강사에게 꼭 알려주세요.
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeEntry && <ClassDetailSheet entry={activeEntry} onClose={() => setActiveEntry(null)} />}
      </AnimatePresence>
    </section>
  )
}
