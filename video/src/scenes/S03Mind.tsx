import { AbsoluteFill, useCurrentFrame } from 'remotion'
import GlowBackground from '../components/GlowBackground'
import WordReveal from '../components/WordReveal'
import { SCRIPT } from '../config/script'
import { SAFE } from '../config/theme'
import { sceneFadeIn } from '../lib/anim'

/** 음성② — 워드 리빌: "마음을 돌보는 것은 아직 낯설다" */
export default function S03Mind() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <GlowBackground />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: `${SAFE.top}px ${SAFE.side + 30}px ${SAFE.bottom}px`,
        }}
      >
        <WordReveal
          sentence={SCRIPT.s03.words}
          highlights={SCRIPT.s03.highlights}
          framesPerWord={9}
          fontSize={68}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
