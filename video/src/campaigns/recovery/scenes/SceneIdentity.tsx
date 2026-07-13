import { AbsoluteFill, useCurrentFrame } from 'remotion'
import GlowBackground from '../../../components/GlowBackground'
import BreathingCircle from '../../../components/BreathingCircle'
import { COLORS, FONTS } from '../../../config/theme'
import { fadeUp, sceneFadeIn } from '../../../lib/anim'
import { RECOVERY } from '../content'

/** 정체성 — 숨 쉬는 원 위로 떠오르는 브랜드 선언 */
export default function SceneIdentity() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <GlowBackground roseOpacity={0.75} sageOpacity={0.35} />
      <BreathingCircle size={880} opacity={0.85} />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 34,
          padding: 90,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 600,
            fontSize: 82,
            lineHeight: 1.5,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            wordBreak: 'keep-all',
            color: COLORS.foreground,
            margin: 0,
            ...fadeUp(frame, 12, 22),
          }}
        >
          {RECOVERY.identity}
        </h2>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 36,
            color: COLORS.mutedForeground,
            margin: 0,
            ...fadeUp(frame, 34, 22),
          }}
        >
          {RECOVERY.identitySub}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
