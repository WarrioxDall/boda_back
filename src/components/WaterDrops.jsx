import { motion, useReducedMotion } from 'framer-motion';

const drops = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 5) % 95}%`,
  top: `${(i * 23 + 10) % 90}%`,
  size: 6 + (i % 5) * 3,
  delay: i * 0.4,
  duration: 4 + (i % 4),
}));

export default function WaterDrops() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute rounded-full"
          style={{
            left: drop.left,
            top: drop.top,
            width: drop.size,
            height: drop.size,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,248,240,0.9), rgba(232,213,183,0.3) 60%, transparent 70%)',
            boxShadow: '0 0 8px rgba(255,248,240,0.4), inset 0 1px 2px rgba(255,255,255,0.6)',
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
