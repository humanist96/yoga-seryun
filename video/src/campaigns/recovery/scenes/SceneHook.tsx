import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import Petals from '../../../components/Petals'
import { COLORS, FONTS } from '../../../config/theme'
import { fadeUp } from '../../../lib/anim'
import { RECOVERY } from '../content'

/** 훅 — 플럼 어둠 속에서 떠오르는 한 문장, 새벽빛이 서서히 밝아온다 */
export default function SceneHook() {
  const frame = useCurrentFrame()
  const dawn = interpolate(frame, [30, 90], [0, 0.22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.plum }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, ${COLORS.accent} 0%, transparent 62%)`,
          opacity: dawn,
        }}
      />
      <Petals />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 90 }}>
        <h1
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 400,
            fontSize: 76,
            lineHeight: 1.55,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            wordBreak: 'keep-all',
            color: COLORS.plumForeground,
            margin: 0,
            ...fadeUp(frame, 12, 24),
          }}
        >
          {RECOVERY.hook}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
