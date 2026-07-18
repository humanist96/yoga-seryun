import Logo from './Logo'

/** 섹션 사이 연꽃 선화 디바이더 */
export default function LotusDivider() {
  return (
    <div className="flex items-center justify-center gap-5" aria-hidden="true">
      <span className="h-px w-16 md:w-24 bg-border" />
      <Logo className="w-7 h-7 text-accent/60" ring={false} sprig={false} />
      <span className="h-px w-16 md:w-24 bg-border" />
    </div>
  )
}
