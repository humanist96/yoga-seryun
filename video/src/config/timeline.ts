/**
 * ★ 타임라인 단일 편집 지점 ★
 * durationInFrames 숫자만 바꾸면 뒤 씬들이 자동으로 밀립니다. (30fps)
 * 음성(guide.wav, 35.6초)은 VOICE_START_FRAME부터 통째로 재생 —
 * 씬 경계가 원장님 문장 타임스탬프(0/9/14/21초)와 맞도록 설계되어 있습니다.
 */
export const FPS = 30
export const WIDTH = 1080
export const HEIGHT = 1920

export interface SceneDef {
  id: string
  durationInFrames: number
}

export const SCENES: readonly SceneDef[] = [
  { id: 'S01Hook', durationInFrames: 120 }, //  0–4s   싱잉볼, 어둠→연꽃빛
  { id: 'S02Body', durationInFrames: 270 }, //  4–13s  음성① 수련실 켄번즈
  { id: 'S03Mind', durationInFrames: 150 }, // 13–18s  음성② 워드 리빌
  { id: 'S04Brand', durationInFrames: 210 }, // 18–25s 음성③ 로고 개화
  { id: 'S05Breath', durationInFrames: 180 }, // 25–31s 음성④ 숨 쉬는 원
  { id: 'S06Classes', durationInFrames: 150 }, // 31–36s 수업 태그
  { id: 'S07Voices', durationInFrames: 120 }, // 36–40s 리뷰 인용
  { id: 'S08End', durationInFrames: 240 }, // 40–48s  오퍼 + 엔드카드
]

export const TOTAL_FRAMES = SCENES.reduce((sum, scene) => sum + scene.durationInFrames, 0)

export const sceneStart = (id: string): number => {
  let acc = 0
  for (const scene of SCENES) {
    if (scene.id === id) return acc
    acc += scene.durationInFrames
  }
  throw new Error(`Unknown scene: ${id}`)
}

export const sceneDuration = (id: string): number => {
  const scene = SCENES.find((item) => item.id === id)
  if (!scene) throw new Error(`Unknown scene: ${id}`)
  return scene.durationInFrames
}

/** 음성 시작 프레임 (S01 훅 이후) */
export const VOICE_START_FRAME = 120
