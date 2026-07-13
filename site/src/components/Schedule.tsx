import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { DAYS, TIMES, SCHEDULE, findNextClass, todayKstDay, type Day } from '../data/schedule'
import { LEVELS } from '../data/content'

const dotClassFor = (level: number): string =>
  LEVELS.find((item) => item.level === level)?.dotClass ?? 'bg-muted'

function useNextClass() {
  return useMemo(() => findNextClass(new Date()), [])
}

interface CellProps {
  day: Day
  time: (typeof TIMES)[number]
  isNext: boolean
}

function ClassCell({ day, time, isNext }: CellProps) {
  const entry = SCHEDULE.find((item) => item.day === day && item.time === time)

  if (!entry) {
    return (
      <div className="rounded-xl border border-dashed border-border/70 min-h-20 flex items-center justify-center">
        <span className="text-xs text-muted-foreground/60">수업 없음</span>
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl bg-card p-3 min-h-20 flex flex-col justify-between ${
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
    </div>
  )
}

function MobileSchedule({ nextKey }: { nextKey: string }) {
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
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DesktopSchedule({ nextKey }: { nextKey: string }) {
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
              <motion.div
                key={`${day}-${time}`}
                {...fadeUp(timeIndex * 0.12 + dayIndex * 0.04)}
              >
                <ClassCell day={day} time={time} isNext={nextKey === `${day}-${time}`} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Schedule() {
  const nextClass = useNextClass()
  const nextKey = nextClass ? `${nextClass.day}-${nextClass.time}` : ''

  return (
    <section id="schedule" className="border-t border-border/60 py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          class schedule
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="mt-4 mb-12 font-serif text-3xl md:text-5xl text-center"
        >
          이번 주의 수련
        </motion.h2>

        <motion.div {...fadeUp(0.2)}>
          <MobileSchedule nextKey={nextKey} />
          <DesktopSchedule nextKey={nextKey} />
        </motion.div>

        <motion.div {...fadeUp(0.3)} className="mt-8 space-y-2 text-sm text-muted-foreground">
          <p>
            14~17시에는 개인레슨 · 특화프로그램 · 강사반 수업이 진행됩니다. 토요일 아침 수업은 오픈
            예정이며, 일요일에는 스페셜 명상(야외 · 테마 · 원데이 클래스)이 비정기로 열립니다.
          </p>
          <p>
            수업은 60분간 진행되며 강의실 입장은 20분 전부터 가능합니다. 임산부, 간질(뇌전증),
            심혈관질환, 정신과적 치료 중인 분은 참여 전 담당 강사에게 꼭 알려주세요.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
