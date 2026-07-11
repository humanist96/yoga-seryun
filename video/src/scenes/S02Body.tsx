import { AbsoluteFill, useCurrentFrame } from 'remotion'
import KenBurns from '../components/KenBurns'
import Caption from '../components/Caption'
import { sceneDuration } from '../config/timeline'
import { SCRIPT } from '../config/script'
import { sceneFadeIn } from '../lib/anim'

/** 음성① — 밝은 수련실 켄번즈: "운동도 열심히, 몸을 잘 챙기시는 분들" */
export default function S02Body() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <KenBurns src="images/studio-hall.jpg" durationInFrames={sceneDuration('S02Body')} />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(253,250,248,0.35) 0%, rgba(253,250,248,0.15) 45%, rgba(253,250,248,0.6) 100%)',
        }}
      />
      <Caption text={SCRIPT.s02.caption} appearFrame={16} />
    </AbsoluteFill>
  )
}
