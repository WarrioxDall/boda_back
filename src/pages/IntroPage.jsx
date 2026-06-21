import { motion } from 'framer-motion';
import WaterDrops from '../components/WaterDrops';
import Envelope from '../components/Envelope';

/**
 * Posición del fondo inicial (introduccion.jpg)
 *
 * Formato: 'X% Y%'
 *   · Primer valor (X): izquierda ↔ derecha
 *   · Segundo valor (Y): arriba ↔ abajo — SUBE Y para bajar la foto en pantalla
 *
 * Edita solo las constantes de abajo:
 */
const BG_OBJECT_POSITION = '50% 52%';
const BG_OBJECT_POSITION_MOBILE = '50% 60%';

export default function IntroPage({ onGuestValidated, guest }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#3d3530]">
      <style>{`
        .intro-page-bg { object-position: ${BG_OBJECT_POSITION_MOBILE}; }
        @media (min-width: 768px) {
          .intro-page-bg { object-position: ${BG_OBJECT_POSITION}; }
        }
      `}</style>
      <img
        src="/assets/intro/introduccion.jpg"
        alt=""
        className="intro-page-bg absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 pointer-events-none" />

      <WaterDrops />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 pb-28 pt-8 md:pt-12 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full max-w-lg md:max-w-xl"
        >
          <p className="mb-4 rounded-full border border-[#faf5ee]/30 bg-[#2a2420]/55 px-4 py-2.5 text-center text-xs not-italic leading-snug tracking-wide text-[#faf5ee] shadow-sm backdrop-blur-sm lg:hidden">
            Te recomendamos ver la invitación en computador
          </p>
          <Envelope
            key={guest?.nombre ?? 'intro'}
            onOpen={onGuestValidated}
            defaultName={guest?.nombre ?? ''}
          />
        </motion.div>
      </div>
    </div>
  );
}
