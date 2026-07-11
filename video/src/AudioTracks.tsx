import { Audio, Sequence, interpolate, staticFile } from 'remotion'
import { VOICE_START_FRAME, sceneStart } from './config/timeline'

/**
 * ★ 오디오 단일 편집 지점 ★
 * 원장님 육성(guide.wav 35.6초)은 통짜로 VOICE_START_FRAME부터 재생 —
 * 문장 경계(0/9/14/21초)가 씬 전환과 일치합니다.
 * SFX는 모션 이벤트 프레임에 정확히 배치.
 */
export default function AudioTracks() {
  const voiceFrames = Math.round(35.58 * 30)

  return (
    <>
      {/* 원장님 육성 — 끝에서 1초 페이드아웃 */}
      <Sequence from={VOICE_START_FRAME} durationInFrames={voiceFrames}>
        <Audio
          src={staticFile('audio/voice/guide.wav')}
          volume={(frame) =>
            interpolate(frame, [0, 15, voiceFrames - 30, voiceFrames], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      </Sequence>

      {/* 싱잉볼 ① — 오프닝 */}
      <Sequence from={0} durationInFrames={270}>
        <Audio src={staticFile('audio/sfx/bowl.wav')} volume={0.8} />
      </Sequence>

      {/* 브레스 우시 — 워드 리빌 · 호흡 씬 진입 */}
      <Sequence from={sceneStart('S03Mind')} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={sceneStart('S05Breath')} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.45} />
      </Sequence>

      {/* 페이퍼 — 수업 태그 · 리뷰 카드 등장 */}
      <Sequence from={sceneStart('S06Classes') + 26} durationInFrames={16}>
        <Audio src={staticFile('audio/sfx/paper.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={sceneStart('S07Voices') + 22} durationInFrames={16}>
        <Audio src={staticFile('audio/sfx/paper.wav')} volume={0.5} />
      </Sequence>

      {/* 엔딩 — 패드가 깔리고, 차임(오퍼 등장), 싱잉볼 여운으로 마무리 */}
      <Sequence from={sceneStart('S08End') - 60} durationInFrames={360}>
        <Audio src={staticFile('audio/sfx/pad.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={sceneStart('S08End') + 44} durationInFrames={80}>
        <Audio src={staticFile('audio/sfx/chime.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={sceneStart('S08End') + 120} durationInFrames={120}>
        <Audio
          src={staticFile('audio/sfx/bowl.wav')}
          volume={(frame) =>
            interpolate(frame, [0, 90, 120], [0.6, 0.4, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      </Sequence>
    </>
  )
}
