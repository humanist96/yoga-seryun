import type { SceneDef } from '../../config/timeline'

/** 릴스 24초 (720f) — 무음성, SFX만. 인앱 음원은 업로드 시 추가 */
export const REELS_SCENES: readonly SceneDef[] = [
  { id: 'Hook', durationInFrames: 90 }, //  0–3s   플럼 배경 훅
  { id: 'Faces', durationInFrames: 150 }, //  3–8s   파스텔 수련실 켄번즈
  { id: 'Identity', durationInFrames: 165 }, //  8–13.5s 숨 쉬는 원 + 정체성
  { id: 'Therapies', durationInFrames: 195 }, // 13.5–20s 테라피 4카드
  { id: 'Cta', durationInFrames: 120 }, // 20–24s  오퍼 엔드카드
]

/** 쇼츠 45초 (1350f) — 원장님 육성 구간 포함, 위치 정보 추가 */
export const SHORTS_SCENES: readonly SceneDef[] = [
  { id: 'Hook', durationInFrames: 90 }, //  0–3s
  { id: 'Faces', durationInFrames: 165 }, //  3–8.5s
  { id: 'Voice', durationInFrames: 375 }, //  8.5–21s 육성 v02+v03
  { id: 'Identity', durationInFrames: 165 }, // 21–26.5s
  { id: 'Therapies', durationInFrames: 225 }, // 26.5–34s
  { id: 'Cta', durationInFrames: 330 }, // 34–45s  오퍼 + 위치
]

export const totalFrames = (scenes: readonly SceneDef[]): number =>
  scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0)

export const startOf = (scenes: readonly SceneDef[], id: string): number => {
  let acc = 0
  for (const scene of scenes) {
    if (scene.id === id) return acc
    acc += scene.durationInFrames
  }
  throw new Error(`Unknown scene: ${id}`)
}
