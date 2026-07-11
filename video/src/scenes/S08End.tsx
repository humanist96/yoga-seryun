import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import GlowBackground from '../components/GlowBackground'
import BreathingCircle from '../components/BreathingCircle'
import Petals from '../components/Petals'
import LotusLogo from '../components/LotusLogo'
import { SCRIPT } from '../config/script'
import { COLORS, FONTS } from '../config/theme'
import { fadeUp, sceneFadeIn } from '../lib/anim'

/** 오퍼(무료 체험) → 엔드카드 */
export default function S08End() {
  const frame = useCurrentFrame()
  const fadeOut = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) * fadeOut }}>
      <GlowBackground roseOpacity={0.7} />
      <BreathingCircle size={900} opacity={0.7} />
      <Petals />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        <div style={{ ...fadeUp(frame, 8) }}>
          <LotusLogo size={150} />
        </div>
        <p
          style={{
            fontFamily: FONTS.latin,
            fontStyle: 'italic',
            fontSize: 36,
            color: COLORS.accentDeep,
            margin: 0,
            ...fadeUp(frame, 16),
          }}
        >
          {SCRIPT.s08.eyebrow}
        </p>
        <h1
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 600,
            fontSize: 84,
            color: COLORS.foreground,
            margin: 0,
            ...fadeUp(frame, 24),
          }}
        >
          {SCRIPT.s08.brand}
        </h1>
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 56,
            color: COLORS.background,
            background: COLORS.foreground,
            borderRadius: 999,
            padding: '30px 70px',
            marginTop: 26,
            ...fadeUp(frame, 44),
          }}
        >
          {SCRIPT.s08.offer}
        </div>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 32,
            color: COLORS.mutedForeground,
            margin: 0,
            ...fadeUp(frame, 58),
          }}
        >
          {SCRIPT.s08.offerSub}
        </p>
        <div style={{ height: 26 }} />
        <p
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 36,
            color: COLORS.accentDeep,
            margin: 0,
            ...fadeUp(frame, 74),
          }}
        >
          {SCRIPT.s08.cta}
        </p>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 30,
            color: COLORS.mutedForeground,
            margin: 0,
            ...fadeUp(frame, 84),
          }}
        >
          {SCRIPT.s08.footer}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
