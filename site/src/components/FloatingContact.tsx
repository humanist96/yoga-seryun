import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { LINKS } from '../data/content'

const BUBBLE_SHOWN_KEY = 'seryun-talk-bubble-shown'
const BUBBLE_APPEAR_MS = 6000
const BUBBLE_DISMISS_MS = 14000

/** 첫 진입 6초 후 1회 노출되는 톡톡 온보딩 말풍선 (기획서 C4) */
function useOnboardingBubble(): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(BUBBLE_SHOWN_KEY)) return
    sessionStorage.setItem(BUBBLE_SHOWN_KEY, '1')
    const showTimer = setTimeout(() => setVisible(true), BUBBLE_APPEAR_MS)
    const hideTimer = setTimeout(() => setVisible(false), BUBBLE_DISMISS_MS)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return visible
}

export default function FloatingContact() {
  const bubbleVisible = useOnboardingBubble()

  return (
    <div className="fixed bottom-40 md:bottom-5 right-4 md:right-5 z-40 flex flex-col items-end gap-2.5">
      <motion.a
        href={LINKS.tel}
        aria-label="전화로 문의하기"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-foreground md:hidden"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
      </motion.a>
      <div className="relative">
        <AnimatePresence>
          {bubbleVisible && (
            <motion.p
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-2xl rounded-br-sm bg-background border border-border shadow-lg px-4 py-2.5 text-xs text-foreground"
            >
              궁금한 건 톡톡으로 편하게 물어보세요
            </motion.p>
          )}
        </AnimatePresence>
        <motion.a
          href={LINKS.naverTalk}
          target="_blank"
          rel="noreferrer"
          aria-label="네이버 톡톡으로 문의하기"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/25"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
        </motion.a>
      </div>
    </div>
  )
}
