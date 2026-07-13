import { AbsoluteFill, useCurrentFrame } from 'remotion'
import KenBurns from '../../../components/KenBurns'
import Caption from '../../../components/Caption'
import { sceneFadeIn } from '../../../lib/anim'
import { RECOVERY } from '../content'

interface SceneFacesProps {
  durationInFrames: number
}

/** 위로 — 파스텔 매트가 놓인 밝은 수련실 켄번즈 */
export default function SceneFaces({ durationInFrames }: SceneFacesProps) {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <KenBurns src="images/hall-pastel.jpg" durationInFrames={durationInFrames} />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(253,250,248,0.3) 0%, rgba(253,250,248,0.1) 45%, rgba(253,250,248,0.55) 100%)',
        }}
      />
      <Caption text={RECOVERY.faces} appearFrame={14} />
    </AbsoluteFill>
  )
}
