import { motion } from 'framer-motion';
import WaterDrops from '../components/WaterDrops';
import Envelope from '../components/Envelope';

/**
 * Posición del fondo inicial (introduccion.jpg)
 *
 * Desktop (≥ 1024px):
 *   · BG_OBJECT_POSITION — 'X% Y%'
 *   · BG_DESKTOP_SCALE — baja el valor (ej. 0.92) para ver más foto; solo alarga
 *     la altura (no encoge el ancho) para evitar bordes laterales en pantallas anchas
 *
 * Móvil (< 1024px):
 *   · BG_MOBILE_OFFSET_Y — baja el perro (positivo = más abajo)
 *   · BG_MOBILE_SLACK — imagen extra arriba; debe ser >= OFFSET_Y
 *   · BG_OBJECT_POSITION_MOBILE — ajuste fino del encuadre (Y: sube = baja el perro)
 */
const BG_OBJECT_POSITION = '50% 52%';
const BG_DESKTOP_SCALE = 0.93;
const BG_OBJECT_POSITION_MOBILE = '50% 38%';
const BG_MOBILE_SLACK = '28%';
const BG_MOBILE_OFFSET_Y = '16%';

export default function IntroPage({ onGuestValidated, guest }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#3d3530]">
      <style>{`
        @media (max-width: 1023px) {
          .intro-page-bg {
            object-position: ${BG_OBJECT_POSITION_MOBILE};
          }
          .intro-page-bg-inner {
            position: absolute;
            left: 0;
            width: 100%;
            height: calc(100% + ${BG_MOBILE_SLACK});
            top: calc(-1 * ${BG_MOBILE_SLACK});
            transform: translateY(${BG_MOBILE_OFFSET_Y});
          }
          .intro-page-bg {
            height: 100%;
            width: 100%;
          }
        }
        @media (min-width: 1024px) {
          .intro-page-bg-inner {
            position: absolute;
            inset: 0;
            transform: none;
          }
          .intro-page-bg {
            position: absolute;
            left: 0;
            width: 100%;
            height: calc(100% / ${BG_DESKTOP_SCALE});
            top: 50%;
            transform: translateY(-50%);
            object-fit: cover;
            object-position: ${BG_OBJECT_POSITION};
          }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden">
        <div className="intro-page-bg-inner h-full w-full">
          <img
            src="/assets/intro/introduccion.jpg"
            alt=""
            className="intro-page-bg h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 pointer-events-none" />

      <WaterDrops />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 pb-16 max-md:pt-0 md:pb-28 md:pt-12 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full max-w-lg md:max-w-xl"
        >
          <p className="mb-1 max-md:mb-1 md:mb-4 rounded-full border border-[#faf5ee]/30 bg-[#2a2420]/55 px-4 py-2 text-center text-[11px] not-italic leading-snug tracking-wide text-[#faf5ee] shadow-sm backdrop-blur-sm md:py-2.5 md:text-xs lg:hidden">
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
