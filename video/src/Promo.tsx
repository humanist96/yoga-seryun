import { AbsoluteFill, Sequence } from 'remotion'
import type { FC } from 'react'
import { SCENES, sceneStart } from './config/timeline'
import { COLORS } from './config/theme'
import AudioTracks from './AudioTracks'
import S01Hook from './scenes/S01Hook'
import S02Body from './scenes/S02Body'
import S03Mind from './scenes/S03Mind'
import S04Brand from './scenes/S04Brand'
import S05Breath from './scenes/S05Breath'
import S06Classes from './scenes/S06Classes'
import S07Voices from './scenes/S07Voices'
import S08End from './scenes/S08End'

export const SCENE_COMPONENTS: Record<string, FC> = {
  S01Hook,
  S02Body,
  S03Mind,
  S04Brand,
  S05Breath,
  S06Classes,
  S07Voices,
  S08End,
}

/** 마스터 컴포지션 — timeline.ts 순서대로 씬을 배치하고 오디오를 깐다 */
export default function Promo() {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {SCENES.map((scene) => {
        const Scene = SCENE_COMPONENTS[scene.id]
        return (
          <Sequence
            key={scene.id}
            from={sceneStart(scene.id)}
            durationInFrames={scene.durationInFrames}
            name={scene.id}
          >
            <Scene />
          </Sequence>
        )
      })}
      <AudioTracks />
    </AbsoluteFill>
  )
}
