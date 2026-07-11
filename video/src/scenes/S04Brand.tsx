import { AbsoluteFill, useCurrentFrame } from 'remotion'
import GlowBackground from '../components/GlowBackground'
import LotusLogo from '../components/LotusLogo'
import Caption from '../components/Caption'
import { SCRIPT } from '../config/script'
import { COLORS, FONTS } from '../config/theme'
import { fadeUp, sceneFadeIn } from '../lib/anim'

/** 음성③ — 연꽃 로고가 그려지며(개화) 브랜드 등장 */
export default function S04Brand() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <GlowBackground />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 36,
          paddingBottom: 160,
        }}
      >
        <LotusLogo size={280} drawFrom={6} drawDurationFrames={70} />
        <p
          style={{
            fontFamily: FONTS.latin,
            fontStyle: 'italic',
            fontSize: 40,
            color: COLORS.accentDeep,
            margin: 0,
            ...fadeUp(frame, 70),
          }}
        >
          {SCRIPT.s04.eyebrow}
        </p>
        <h1
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 600,
            fontSize: 96,
            color: COLORS.foreground,
            letterSpacing: -1,
            margin: 0,
            ...fadeUp(frame, 84),
          }}
        >
          {SCRIPT.s04.title}
        </h1>
      </AbsoluteFill>
      <Caption text={SCRIPT.s04.caption} appearFrame={100} fontSize={46} />
    </AbsoluteFill>
  )
}
