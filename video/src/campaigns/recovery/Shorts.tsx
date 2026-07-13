import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion'
import { COLORS } from '../../config/theme'
import { SHORTS_SCENES, startOf } from './timeline'
import SceneHook from './scenes/SceneHook'
import SceneFaces from './scenes/SceneFaces'
import SceneVoice from './scenes/SceneVoice'
import SceneIdentity from './scenes/SceneIdentity'
import SceneTherapies from './scenes/SceneTherapies'
import SceneCta from './scenes/SceneCta'

const duration = (id: string): number => {
  const scene = SHORTS_SCENES.find((item) => item.id === id)
  if (!scene) throw new Error(`Unknown scene: ${id}`)
  return scene.durationInFrames
}

/** 쇼츠 45초 — 원장님 육성 구간 + 위치 정보 포함 확장판 */
export default function RecoveryShorts() {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={startOf(SHORTS_SCENES, 'Hook')} durationInFrames={duration('Hook')} name="Hook">
        <SceneHook />
      </Sequence>
      <Sequence from={startOf(SHORTS_SCENES, 'Faces')} durationInFrames={duration('Faces')} name="Faces">
        <SceneFaces durationInFrames={duration('Faces')} />
      </Sequence>
      <Sequence from={startOf(SHORTS_SCENES, 'Voice')} durationInFrames={duration('Voice')} name="Voice">
        <SceneVoice durationInFrames={duration('Voice')} />
      </Sequence>
      <Sequence
        from={startOf(SHORTS_SCENES, 'Identity')}
        durationInFrames={duration('Identity')}
        name="Identity"
      >
        <SceneIdentity />
      </Sequence>
      <Sequence
        from={startOf(SHORTS_SCENES, 'Therapies')}
        durationInFrames={duration('Therapies')}
        name="Therapies"
      >
        <SceneTherapies durationInFrames={duration('Therapies')} />
      </Sequence>
      <Sequence from={startOf(SHORTS_SCENES, 'Cta')} durationInFrames={duration('Cta')} name="Cta">
        <SceneCta durationInFrames={duration('Cta')} extended />
      </Sequence>

      <Sequence from={0} name="sfx-bowl">
        <Audio src={staticFile('audio/sfx/bowl.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={startOf(SHORTS_SCENES, 'Cta')} name="sfx-chime">
        <Audio src={staticFile('audio/sfx/chime.wav')} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  )
}
