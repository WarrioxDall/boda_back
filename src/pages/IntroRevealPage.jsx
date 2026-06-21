import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const REVEAL_IMAGE = '/assets/intro/introduccion_1.jpg';
const AUTO_ADVANCE_MS = 4200;

/**
 * Posición de introduccion_1.jpg (pantalla después del sobre)
 *
 * Formato: 'X% Y%'
 *   · Sube X (ej. 65%) = muestra más el lado derecho de la foto
 *   · Baja X (ej. 45%) = muestra más el lado izquierdo
 *   · Sube Y = baja el encuadre vertical
 *
 * Zoom en móvil: REVEAL_MOBILE_SCALE — baja el valor (ej. 0.85) para ver más foto
 *
 * Edita solo las constantes de abajo:
 */
const REVEAL_OBJECT_POSITION = '50% 42%';
const REVEAL_OBJECT_POSITION_MOBILE = '55% 10%';
const REVEAL_MOBILE_SCALE = 0.88;

export default function IntroRevealPage({ onComplete }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const delay = reduceMotion ? 800 : AUTO_ADVANCE_MS;
    const timer = setTimeout(onComplete, delay);
    return () => clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#2a2420]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.3 : 0.6 }}
      onClick={onComplete}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onComplete();
      }}
      aria-label="Continuar a la invitación"
    >
      <style>{`
        .intro-reveal-bg { object-position: ${REVEAL_OBJECT_POSITION_MOBILE}; }
        .intro-reveal-inner {
          transform: scale(${REVEAL_MOBILE_SCALE});
          transform-origin: center center;
          height: 100%;
          width: 100%;
        }
        @media (min-width: 768px) {
          .intro-reveal-bg { object-position: ${REVEAL_OBJECT_POSITION}; }
          .intro-reveal-inner { transform: none; }
        }
      `}</style>

      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduceMotion ? 1 : 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0.4 : 2.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="intro-reveal-inner">
          <img
            src={REVEAL_IMAGE}
            alt=""
            className="intro-reveal-bg h-full w-full object-cover"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.35] }}
        transition={{ duration: 2.4, delay: 0.4, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(42,36,32,0.55) 100%)',
        }}
      />

      <motion.p
        className="pointer-events-none absolute bottom-10 left-0 right-0 text-center font-display text-2xl italic tracking-[0.08em] text-white/90 md:text-3xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: reduceMotion ? 0.2 : 1.4, ease: 'easeOut' }}
      >
        Shanty & Mateo
      </motion.p>

      <motion.p
        className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs not-italic text-white/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0.4 : 2.6, duration: 0.8 }}
      >
        Toca para continuar
      </motion.p>
    </motion.div>
  );
}
