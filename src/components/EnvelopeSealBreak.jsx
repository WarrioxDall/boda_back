import { motion } from 'framer-motion';
import EnvelopeMoonSeal from '../icons/EnvelopeMoonSeal';

/** Sello de cera que tiembla, se parte en dos y gira al abrir el sobre */
export default function EnvelopeSealBreak({ isOpening }) {
  return (
    <div
      className="absolute left-1/2 top-9 z-50 -translate-x-1/2 -translate-y-1/2 md:top-12"
      aria-hidden="true"
    >
      <motion.div
        className="relative h-12 w-12 md:h-16 md:w-16"
        animate={isOpening ? { rotate: [0, -7, 7, -5, 5, 0] } : { rotate: 0 }}
        transition={isOpening ? { duration: 0.5, ease: 'easeInOut' } : { duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: 'inset(0 50% 0 0)' }}
          animate={
            isOpening
              ? { x: [0, 0, -16, -32], rotate: [0, 0, -22, -48], opacity: [1, 1, 0.8, 0] }
              : { x: 0, rotate: 0, opacity: 1 }
          }
          transition={
            isOpening
              ? { duration: 0.75, times: [0, 0.35, 0.7, 1], delay: 0.42, ease: [0.34, 1.15, 0.64, 1] }
              : { duration: 0.2 }
          }
        >
          <EnvelopeMoonSeal className="h-12 w-12 drop-shadow-[0_3px_10px_rgba(61,53,48,0.4)] md:h-16 md:w-16" />
        </motion.div>

        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: 'inset(0 0 0 50%)' }}
          animate={
            isOpening
              ? { x: [0, 0, 16, 32], rotate: [0, 0, 22, 48], opacity: [1, 1, 0.8, 0] }
              : { x: 0, rotate: 0, opacity: 1 }
          }
          transition={
            isOpening
              ? { duration: 0.75, times: [0, 0.35, 0.7, 1], delay: 0.42, ease: [0.34, 1.15, 0.64, 1] }
              : { duration: 0.2 }
          }
        >
          <EnvelopeMoonSeal className="h-12 w-12 drop-shadow-[0_3px_10px_rgba(61,53,48,0.4)] md:h-16 md:w-16" />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-y-1 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-[#faf7f2]"
          animate={
            isOpening
              ? { scaleY: [0, 0, 1.15, 1.4], opacity: [0, 0, 0.95, 0] }
              : { scaleY: 0, opacity: 0 }
          }
          transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  );
}
