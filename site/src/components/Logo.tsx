interface LogoProps {
  className?: string
}

/** 연꽃 선화 — 세(世)+련(蓮), 세상에 피어난 연꽃 */
export default function Logo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 6c-2.2 3-3.2 6.2-3.2 9.4 0 3.4 1.4 6 3.2 7.6 1.8-1.6 3.2-4.2 3.2-7.6 0-3.2-1-6.4-3.2-9.4Z" />
      <path d="M8.4 11.5c-.4 3.6.5 6.9 2.4 9.2 1.1 1.3 2.4 2.2 3.9 2.7" />
      <path d="M23.6 11.5c.4 3.6-.5 6.9-2.4 9.2-1.1 1.3-2.4 2.2-3.9 2.7" />
      <path d="M5 18.2c1 2.8 3 4.9 5.6 6 1.6.7 3.4 1 5.4 1s3.8-.3 5.4-1c2.6-1.1 4.6-3.2 5.6-6" />
    </svg>
  )
}
