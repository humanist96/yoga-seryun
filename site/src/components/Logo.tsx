interface LogoProps {
  className?: string
  /** 원형 링 캡션(BREATHE·FLOW·BE STILL) 표시 여부 — 아주 작은 크기에서는 끈다 */
  ring?: boolean
  /** 하단 잎사귀 가지 표시 여부 */
  sprig?: boolean
}

const LEAVES: Array<[number, number, number, number?]> = [
  [59, 98, -140],
  [68, 96.5, -112],
  [78, 92.5, -84],
  [88, 85.5, -62],
  [96.5, 76, -46, 0.85],
]

/**
 * SR 브랜드 엠블럼 — 원형 링(BREATHE · FLOW · BE STILL) + SR 세리프 모노그램 + 잎사귀 가지.
 * currentColor를 상속하므로 밝은/어두운 배경 모두에서 선화로 표현된다.
 */
export default function Logo({ className = 'w-10 h-10', ring = true, sprig = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="요가명상,세련 — Breathe, Flow, Be Still"
    >
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth={ring ? 0.9 : 1.4} />

      {ring && (
        <>
          <defs>
            <path id="sr-ring-top" d="M 20.1,78.6 A 44,44 0 1 1 99.9,78.6" />
          </defs>
          <text
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="8.2"
            letterSpacing="2.3"
            fill="currentColor"
          >
            <textPath href="#sr-ring-top" startOffset="50%" textAnchor="middle">
              BREATHE · FLOW · BE STILL
            </textPath>
          </text>
        </>
      )}

      <text
        x="60"
        y={ring ? 77 : 79}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={ring ? 55 : 60}
        fontWeight="600"
        letterSpacing="-6"
        fill="currentColor"
      >
        SR
      </text>

      {sprig && (
        <g
          stroke="currentColor"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M52,99 C68,101 85,94 100,73" />
          {LEAVES.map(([x, y, rot, s = 1], i) => (
            <g key={i} transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
              <path d="M0,0 C3,-3.2 8,-3.2 11,0 C8,3.2 3,3.2 0,0 Z" />
              <path d="M1.2,0 L9.6,0" />
            </g>
          ))}
        </g>
      )}
    </svg>
  )
}
