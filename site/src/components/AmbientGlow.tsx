interface AmbientGlowProps {
  className?: string
}

/** 새벽빛 번짐 — 섹션 배경에 까는 초저채도 라디얼 글로우 */
export default function AmbientGlow({ className = '' }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  )
}
