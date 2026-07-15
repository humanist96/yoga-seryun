/**
 * rAF 구동 섹션 스크롤 — CSS `scroll-behavior: smooth`의 네이티브 스크롤은
 * 진행 중 whileInView 애니메이션 발화 구간에서 Chrome이 중단시키는 문제가 있어
 * (긴 앵커 점프가 중간에 멈춤), 프레임마다 위치를 직접 지정하는 방식으로 대체한다.
 * 사용자가 휠·터치로 개입하면 즉시 양보하고, '동작 줄이기' 설정은 즉시 점프로 존중한다.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return

  const targetY = el.getBoundingClientRect().top + window.scrollY

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: targetY, behavior: 'instant' })
    return
  }

  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 2) return

  const duration = Math.min(1100, 450 + Math.abs(distance) * 0.07)
  let startTime: number | null = null
  let cancelled = false

  const cancel = () => {
    cancelled = true
  }
  window.addEventListener('wheel', cancel, { once: true, passive: true })
  window.addEventListener('touchstart', cancel, { once: true, passive: true })

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const step = (timestamp: number) => {
    if (cancelled) return
    if (startTime === null) startTime = timestamp
    const progress = Math.min(1, (timestamp - startTime) / duration)
    window.scrollTo({ top: startY + distance * easeOutCubic(progress), behavior: 'instant' })
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/** 앵커 <a href="#id"> 클릭 핸들러 — 기본 점프를 막고 rAF 스크롤로 대체, 해시는 유지 */
export function handleAnchorClick(event: { preventDefault: () => void }, href: string): void {
  const id = href.replace(/^#/, '')
  if (!document.getElementById(id)) return
  event.preventDefault()
  history.replaceState(null, '', `#${id}`)
  scrollToSection(id)
}
