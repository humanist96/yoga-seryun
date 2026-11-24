export const DAYS = ['월', '화', '수', '목', '금', '토'] as const
export const TIMES = ['07:30', '12:00', '18:30', '20:00'] as const

export type Day = (typeof DAYS)[number]
export type Time = (typeof TIMES)[number]

export interface ScheduleEntry {
  day: Day
  /** 시간표의 줄(슬롯) */
  time: Time
  name: string
  level: number
  teacher?: string
  /** 실제 시작 시각이 줄과 다를 때 (예: 07:30 줄의 07:00 시작 수업) */
  startTime?: string
  /** 격주 수업 — 그 달의 몇째 주에 열리는지 (예: [1, 3]) */
  weeks?: readonly number[]
}

/** 시간표 기준 월 — 시간표를 바꿀 때 함께 바꾼다. */
export const SCHEDULE_MONTH = '2026년 12월'

export const SCHEDULE: readonly ScheduleEntry[] = [
  { day: '월', time: '07:30', name: '이지하타', level: 4 },
  { day: '화', time: '07:30', name: '아로마 호흡명상', level: 2, startTime: '07:00' },
  { day: '수', time: '07:30', name: '근막테라피', level: 3 },
  { day: '목', time: '07:30', name: '아쉬탕가 L1', level: 5, startTime: '07:00' },
  { day: '금', time: '07:30', name: '인요가', level: 1 },

  { day: '월', time: '12:00', name: '프리메드 테라피', level: 3 },
  { day: '화', time: '12:00', name: '인요가', level: 1 },
  { day: '수', time: '12:00', name: '빈야사 L1', level: 5 },
  { day: '목', time: '12:00', name: '싱잉볼 이완명상', level: 2 },
  { day: '금', time: '12:00', name: '하타', level: 4 },
  { day: '토', time: '12:00', name: '아로마 호흡명상', level: 2, startTime: '10:30' },

  { day: '월', time: '18:30', name: '싱잉볼 이완명상', level: 2 },
  { day: '화', time: '18:30', name: '인요가', level: 1, teacher: '나영' },
  { day: '수', time: '18:30', name: '근막테라피', level: 3, teacher: '시소', weeks: [1, 3] },
  { day: '수', time: '18:30', name: '아로마 호흡명상', level: 2, teacher: '시소', weeks: [2, 4] },
  { day: '목', time: '18:30', name: '빈야사 L2', level: 5, teacher: '나영' },
  { day: '금', time: '18:30', name: '이지하타', level: 4, teacher: '시소' },

  { day: '월', time: '20:00', name: '프리메드 테라피', level: 3 },
  { day: '화', time: '20:00', name: '아로마 호흡명상', level: 2, teacher: '나영' },
  { day: '수', time: '20:00', name: '크라마플로우', level: 4, teacher: '시소' },
  { day: '목', time: '20:00', name: '싱잉볼 이완명상', level: 2, teacher: '나영', weeks: [1, 3] },
  { day: '목', time: '20:00', name: '하타', level: 4, teacher: '나영', weeks: [2, 4] },
  { day: '금', time: '20:00', name: '아쉬탕가 L1', level: 5, teacher: '시소' },
]

export interface SpecialClass {
  /** ISO 날짜 — 이 날짜(포함)까지 노출, 지나면 자동 숨김 */
  date: string
  dateLabel: string
  sessions: readonly { time: string; name: string; minutes: number }[]
  note: string
  prices: readonly { label: string; value: string }[]
}

/** 스페셜 클래스 — null이면 미노출. */
export const SPECIAL_CLASS: SpecialClass | null = {
  date: '2026-12-19',
  dateLabel: '12/19 (토)',
  sessions: [
    { time: '10:30', name: '아로마 호흡명상', minutes: 90 },
    { time: '13:00', name: '크라마플로우', minutes: 90 },
  ],
  note: '특별 명상과 함께 다과와 차담이 진행됩니다.',
  prices: [
    { label: '기존회원', value: '1회 차감 + 1만원' },
    { label: '비회원', value: '3만원' },
  ],
}

export interface Closure {
  /** 휴관일 ISO 날짜 목록 — 마지막 날이 지나면 안내가 자동으로 숨겨진다. */
  dates: readonly string[]
  message: string
}

/** 휴관 안내 — null이면 미노출. 휴관일은 "다가오는 수업"에서도 제외된다. */
export const CLOSURE: Closure | null = {
  dates: ['2026-12-24', '2026-12-25'],
  message: '12월 24일(목) · 25일(금)은 휴관입니다.',
}

/** 수업의 실제 시작 시각 */
export const startTimeOf = (entry: ScheduleEntry): string => entry.startTime ?? entry.time

/** "1,3주" — 격주 수업이 아니면 빈 문자열 */
export const weeksLabel = (entry: ScheduleEntry): string =>
  entry.weeks ? `${entry.weeks.join(',')}주` : ''

/** 배너·하이라이트에서 수업을 구분하는 키 */
export const entryKey = (entry: ScheduleEntry): string =>
  `${entry.day}-${entry.time}-${entry.name}`

/** KST 기준 오늘 날짜 (YYYY-MM-DD) */
export const todayKstIso = (now: Date): string =>
  now.toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })

const DAY_BY_JS_INDEX: Record<number, Day | undefined> = {
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
}

const toMinutes = (time: string): number => {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

export interface NextClassInfo {
  entry: ScheduleEntry
  /** 0이면 오늘, 1이면 내일… */
  dayOffset: number
  /** 시작까지 남은 분 — dayOffset이 0일 때만 유효 */
  minutesUntil: number
}

const toIsoDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/**
 * 지금(KST) 기준으로 가장 가까운 다음 수업과 남은 시간을 찾는다.
 * 휴관일은 건너뛰고, 격주 수업은 그 달의 몇째 주인지에 맞는 수업만 고른다.
 */
export const findNextClassInfo = (now: Date): NextClassInfo | undefined => {
  const kst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  const nowMinutes = kst.getHours() * 60 + kst.getMinutes()

  for (let offset = 0; offset < 14; offset += 1) {
    const date = new Date(kst.getFullYear(), kst.getMonth(), kst.getDate() + offset)
    const day = DAY_BY_JS_INDEX[date.getDay()]
    if (!day) continue
    if (CLOSURE?.dates.includes(toIsoDate(date))) continue

    const weekOfMonth = Math.ceil(date.getDate() / 7)
    const candidates = SCHEDULE.filter(
      (entry) =>
        entry.day === day &&
        (!entry.weeks || entry.weeks.includes(weekOfMonth)) &&
        (offset > 0 || toMinutes(startTimeOf(entry)) > nowMinutes),
    ).sort((a, b) => toMinutes(startTimeOf(a)) - toMinutes(startTimeOf(b)))

    if (candidates.length > 0) {
      const entry = candidates[0]
      return {
        entry,
        dayOffset: offset,
        minutesUntil: offset === 0 ? toMinutes(startTimeOf(entry)) - nowMinutes : 0,
      }
    }
  }
  return undefined
}

/** 지금(KST) 기준으로 가장 가까운 다음 수업을 찾는다. */
export const findNextClass = (now: Date): ScheduleEntry | undefined =>
  findNextClassInfo(now)?.entry

export const todayKstDay = (now: Date): Day => {
  const kst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  return DAY_BY_JS_INDEX[kst.getDay()] ?? '월'
}
