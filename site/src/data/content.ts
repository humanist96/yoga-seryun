export const LINKS = {
  booking: 'https://m.booking.naver.com/booking/6/bizes/1676272',
  naverTalk: 'https://talk.naver.com/wzaw470',
  naverMap: 'https://map.naver.com/p/entry/place/2088771512',
  instagram: 'https://www.instagram.com/yoga_seryun',
  blog: 'https://blog.naver.com/mindful_yoga_seryun',
  youtube: 'https://www.youtube.com/@SeryunTV',
  tel: 'tel:010-4985-0082',
} as const

/** 촬영 영상 확보 시 URL을 넣으면 히어로가 비디오로 전환됩니다. 비어 있으면 켄번즈 포스터 이미지 사용. */
export const HERO_VIDEO_URL = ''

export interface ClassLevel {
  level: number
  name: string
  description: string
  dotClass: string
}

export const LEVELS: readonly ClassLevel[] = [
  {
    level: 1,
    name: '레벨 1',
    description: '남녀노소 즐길 수 있는 편안한 요가',
    dotClass: 'bg-[#E4C97E]',
  },
  {
    level: 2,
    name: '레벨 2',
    description: '신체의 깊은 이완을 주는 힐링 요가 뒤에 이어지는 명상',
    dotClass: 'bg-[#E0A98F]',
  },
  {
    level: 3,
    name: '레벨 3',
    description: '오십견, 허리통증 등 근골격계 질환을 돌보는 근막이완 테라피',
    dotClass: 'bg-[#A9BC93]',
  },
  {
    level: 4,
    name: '레벨 4',
    description: '찬드라 나마스카라 기반, 깊은 이완과 속근육을 깨우는 전통 요가',
    dotClass: 'bg-[#9DBBC9]',
  },
  {
    level: 5,
    name: '레벨 5',
    description: '수리아 나마스카라 기반, 역동적 움직임으로 근력과 체형의 변화를 이끄는 전통 요가',
    dotClass: 'bg-[#B49BC0]',
  },
]

export interface ClassCategory {
  eyebrow: string
  title: string
  items: readonly string[]
  note: string
}

export const CATEGORIES: readonly ClassCategory[] = [
  {
    eyebrow: 'meditation',
    title: '명상',
    items: ['싱잉볼 이완명상', '아로마 호흡명상', '회복명상 테라피', '근막 테라피'],
    note: '싱잉볼의 울림과 아로마의 향으로 긴장을 내려놓는 시간',
  },
  {
    eyebrow: 'yoga',
    title: '요가',
    items: ['하타', '빈야사', '인요가', '아쉬탕가', '힐링하타'],
    note: '전통과 현대를 아우르는, 레벨 1부터 5까지의 수련',
  },
  {
    eyebrow: 'care',
    title: '케어',
    items: ['개인레슨', '암테라피(회복 테라피)', '숙면 테라피', '기업강의 · 단체수업'],
    note: '투병 중인 분들과 잠 못 드는 분들을 위한 특별한 돌봄 — 상담 후 진행합니다',
  },
]

export interface Review {
  quote: string
  tag: string
}

export const REVIEWS: readonly Review[] = [
  { quote: '1회 체험으로 방문하고 너무 좋아서 바로 등록했습니다. 요가는 처음인데 몸도 마음도 편해지는 수업이었어요.', tag: '첫 체험' },
  { quote: '힐링되는 선생님 말씀과 싱잉볼의 울림이 귀에 댕— 하고 울렸어요.', tag: '싱잉볼 이완명상' },
  { quote: '과한 동작보다 근막을 이완시키는 자세들 덕분에 힐링됐어요. 들어올 때와 나갈 때 표정이 달라졌다고 하시더라고요.', tag: '근막테라피' },
  { quote: '사람마다 몸 상태에 맞게 지도해 주세요. 선생님 목소리가 정말 좋아서 수업 내내 힐링이었어요.', tag: '하타' },
  { quote: '수업 한 번뿐인데 고질적인 편두통이 조금 나아진 기분이에요.', tag: '아로마 호흡명상' },
  { quote: '21주차 임산부인데 무리 없이 진행할 수 있어서 바로 등록했어요.', tag: '맞춤 지도' },
]

export interface ReviewKeyword {
  label: string
  count: number
}

export const REVIEW_KEYWORDS: readonly ReviewKeyword[] = [
  { label: '시설이 깔끔해요', count: 55 },
  { label: '맞춤 지도를 잘해줘요', count: 45 },
  { label: '선생님 실력이 좋아요', count: 32 },
  { label: '수업이 체계적이에요', count: 30 },
  { label: '가격이 합리적이에요', count: 30 },
  { label: '초보자에게도 적합해요', count: 28 },
  { label: '소수정예예요', count: 21 },
]

export interface Faq {
  q: string
  a: string
}

export const FAQS: readonly Faq[] = [
  {
    q: '요가가 처음인데 괜찮을까요?',
    a: '괜찮습니다. 레벨 1부터 5까지 단계별 수업이 있어 그날의 컨디션에 맞게 선택할 수 있고, 소수정예(4~5명)라 한 분 한 분 몸 상태에 맞춰 지도합니다.',
  },
  {
    q: '임산부도 수업을 들을 수 있나요?',
    a: '네, 다만 임산부와 뇌전증이 있는 분은 수업 전 강사와 상담을 먼저 해주세요. 몸 상태에 맞는 수업과 강도를 안내해 드립니다.',
  },
  {
    q: '준비물이 필요한가요?',
    a: '매트와 소도구는 모두 준비되어 있습니다. 스판 소재 바지에 몸에 붙는 상의처럼 움직임이 편한 복장이면 충분합니다.',
  },
  {
    q: '주차할 수 있나요?',
    a: '두산더랜드파크 주차장을 이용하시면 평일 2시간(오후 6시 이후 3시간), 주말 3시간 무료입니다. 주차장 진입 후 우회전해 A동 가까이 주차하시면 요가원 직통 엘리베이터와 가장 가깝습니다.',
  },
  {
    q: '회원 수련 예약은 어떻게 하나요?',
    a: "등록 후에는 '운동가' 앱에서 '요가명상세련 마곡나루점'을 검색해 연결하면 수련 예약과 변경을 앱에서 할 수 있습니다.",
  },
]
