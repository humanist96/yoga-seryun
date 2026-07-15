import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/** 다이얼로그 내부에서 Tab/Shift+Tab 포커스를 순환시킨다 — 뒤 페이지로의 포커스 유출 방지 */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const container = containerRef.current
      if (!container) return

      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !container.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [containerRef])
}
