export const DAYS = ['월', '화', '수', '목', '금', '토'] as const
export const TIMES = ['07:30', '12:00', '18:30', '20:00'] as const

export type Day = (typeof DAYS)[number]
export type Time = (typeof TIMES)[number]

export interface ScheduleEntry {
  day: Day
  time: Time
  name: string
  level: number
  teacher?: string
}

export const SCHEDULE: readonly ScheduleEntry[] = [
  { day: '월', time: '07:30', name: '인요가', level: 1 },
  { day: '화', time: '07:30', name: '아로마 호흡명상', level: 2 },
  { day: '수', time: '07:30', name: '힐링 하타', level: 2 },
  { day: '목', time: '07:30', name: '빈야사', level: 5 },
  { day: '금', time: '07:30', name: '싱잉볼 이완명상', level: 2 },

  { day: '월', time: '12:00', name: '근막테라피', level: 3 },
  { day: '화', time: '12:00', name: '아쉬탕가 LV1', level: 5 },
  { day: '수', time: '12:00', name: '싱잉볼 이완명상', level: 2 },
  { day: '목', time: '12:00', name: '하타', level: 4 },
  { day: '금', time: '12:00', name: '인요가', level: 1 },
  { day: '토', time: '12:00', name: '아로마 호흡명상', level: 2 },

  { day: '월', time: '18:30', name: '아로마 호흡명상', level: 2 },
  { day: '화', time: '18:30', name: '인요가', level: 1, teacher: '나영' },
  { day: '수', time: '18:30', name: '빈야사', level: 5, teacher: '시소' },
  { day: '목', time: '18:30', name: '싱잉볼 이완명상', level: 2, teacher: '나영' },
  { day: '금', time: '18:30', name: '힐링 하타', level: 2, teacher: '시소' },

  { day: '월', time: '20:00', name: '프리메드 테라피', level: 3 },
  { day: '화', time: '20:00', name: '하타', level: 4, teacher: '나영' },
  { day: '수', time: '20:00', name: '아로마 호흡명상', level: 2 },
  { day: '목', time: '20:00', name: '아쉬탕가 LV1', level: 5, teacher: '나영' },
  { day: '금', time: '20:00', name: '인요가', level: 1 },
]

const DAY_BY_JS_INDEX: Record<number, Day | undefined> = {
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
}

const toMinutes = (time: Time): number => {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

/** 지금(KST) 기준으로 가장 가까운 다음 수업을 찾는다. */
export const findNextClass = (now: Date): ScheduleEntry | undefined => {
  const kst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  const nowMinutes = kst.getHours() * 60 + kst.getMinutes()

  for (let offset = 0; offset < 7; offset += 1) {
    const jsDay = (kst.getDay() + offset) % 7
    const day = DAY_BY_JS_INDEX[jsDay]
    if (!day) continue

    const candidates = SCHEDULE.filter(
      (entry) => entry.day === day && (offset > 0 || toMinutes(entry.time) > nowMinutes),
    ).sort((a, b) => toMinutes(a.time) - toMinutes(b.time))

    if (candidates.length > 0) return candidates[0]
  }
  return undefined
}

export const todayKstDay = (now: Date): Day => {
  const kst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  return DAY_BY_JS_INDEX[kst.getDay()] ?? '월'
}
