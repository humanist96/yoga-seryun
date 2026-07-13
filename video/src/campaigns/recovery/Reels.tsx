import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion'
import { COLORS } from '../../config/theme'
import { REELS_SCENES, startOf } from './timeline'
import SceneHook from './scenes/SceneHook'
import SceneFaces from './scenes/SceneFaces'
import SceneIdentity from './scenes/SceneIdentity'
import SceneTherapies from './scenes/SceneTherapies'
import SceneCta from './scenes/SceneCta'

const duration = (id: string): number => {
  const scene = REELS_SCENES.find((item) => item.id === id)
  if (!scene) throw new Error(`Unknown scene: ${id}`)
  return scene.durationInFrames
}

/** 릴스 24초 — BGM은 인스타그램 인앱 음원으로 추가 (checklist 참조) */
export default function RecoveryReels() {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={startOf(REELS_SCENES, 'Hook')} durationInFrames={duration('Hook')} name="Hook">
        <SceneHook />
      </Sequence>
      <Sequence from={startOf(REELS_SCENES, 'Faces')} durationInFrames={duration('Faces')} name="Faces">
        <SceneFaces durationInFrames={duration('Faces')} />
      </Sequence>
      <Sequence
        from={startOf(REELS_SCENES, 'Identity')}
        durationInFrames={duration('Identity')}
        name="Identity"
      >
        <SceneIdentity />
      </Sequence>
      <Sequence
        from={startOf(REELS_SCENES, 'Therapies')}
        durationInFrames={duration('Therapies')}
        name="Therapies"
      >
        <SceneTherapies durationInFrames={duration('Therapies')} />
      </Sequence>
      <Sequence from={startOf(REELS_SCENES, 'Cta')} durationInFrames={duration('Cta')} name="Cta">
        <SceneCta durationInFrames={duration('Cta')} />
      </Sequence>

      <Sequence from={0} name="sfx-bowl">
        <Audio src={staticFile('audio/sfx/bowl.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={startOf(REELS_SCENES, 'Cta')} name="sfx-chime">
        <Audio src={staticFile('audio/sfx/chime.wav')} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  )
}
