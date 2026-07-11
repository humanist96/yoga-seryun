import { useCurrentFrame } from 'remotion'
import { fadeUp } from '../lib/anim'
import { COLORS, FONTS, SAFE } from '../config/theme'

interface CaptionProps {
  text: string
  appearFrame?: number
  dark?: boolean
  fontSize?: number
}

/** 하단 자막 — 원장님 육성과 동기화되는 마루부리 캡션 */
export default function Caption({
  text,
  appearFrame = 10,
  dark = false,
  fontSize = 52,
}: CaptionProps) {
  const frame = useCurrentFrame()
  const style = fadeUp(frame, appearFrame, 20)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: SAFE.bottom,
        left: SAFE.side,
        right: SAFE.side,
        display: 'flex',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.serif,
          fontWeight: 400,
          fontSize,
          lineHeight: 1.5,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          wordBreak: 'keep-all',
          color: dark ? COLORS.plumForeground : COLORS.foreground,
          background: dark ? 'rgba(49, 32, 42, 0.55)' : 'rgba(253, 250, 248, 0.72)',
          borderRadius: 28,
          padding: '28px 44px',
        }}
      >
        {text}
      </div>
    </div>
  )
}
