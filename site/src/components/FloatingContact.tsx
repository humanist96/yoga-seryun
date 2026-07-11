import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { LINKS } from '../data/content'

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5">
      <motion.a
        href={LINKS.tel}
        aria-label="전화로 문의하기"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-foreground md:hidden"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
      </motion.a>
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
  )
}
