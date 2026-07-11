import { interpolate, useCurrentFrame } from 'remotion'
import { COLORS, FONTS } from '../config/theme'

interface WordRevealProps {
  sentence: string
  highlights?: readonly string[]
  startFrame?: number
  framesPerWord?: number
  fontSize?: number
}

/** 웹사이트 Philosophy의 단어별 리빌 — 프레임 구동판 */
export default function WordReveal({
  sentence,
  highlights = [],
  startFrame = 8,
  framesPerWord = 7,
  fontSize = 64,
}: WordRevealProps) {
  const frame = useCurrentFrame()
  const words = sentence.split(' ')

  return (
    <p
      style={{
        fontFamily: FONTS.serif,
        fontWeight: 400,
        fontSize,
        lineHeight: 1.7,
        wordBreak: 'keep-all',
        textAlign: 'center',
        margin: 0,
      }}
    >
      {words.map((word, index) => {
        const from = startFrame + index * framesPerWord
        const opacity = interpolate(frame, [from, from + framesPerWord * 2], [0.15, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const isHighlight = highlights.includes(word)
        return (
          <span
            key={`${word}-${index}`}
            style={{ opacity, color: isHighlight ? COLORS.accent : COLORS.foreground }}
          >
            {word}{' '}
          </span>
        )
      })}
    </p>
  )
}
