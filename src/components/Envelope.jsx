import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { validateGuest } from '../api/client';
import EnvelopeSealBreak from './EnvelopeSealBreak';

const DRAGON_QUOTE =
  'Durante años, un dragón recorrió el mundo buscando algo más brillante que el fuego. Una noche encontró la luna y decidió quedarse para siempre.';

const OPEN_DURATION = 4200;
const WHATSAPP_URL =
  'https://wa.me/573024562648?text=' +
  encodeURIComponent('Hola, no encuentro mi nombre en la lista de invitados.');

export default function Envelope({ onOpen, disabled, defaultName = '' }) {
  const reduceMotion = useReducedMotion();
  const [nombre, setNombre] = useState(defaultName);
  const [error, setError] = useState('');
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled || loading || isOpening) return;

    setError('');
    setShowWhatsApp(false);
    setLoading(true);

    try {
      const guest = await validateGuest(nombre);
      if (reduceMotion) {
        onOpen(guest);
        return;
      }
      setIsOpening(true);
      setTimeout(() => onOpen(guest), OPEN_DURATION);
    } catch (err) {
      setShake(true);
      setError(
        err.status === 404
          ? 'No encontramos tu nombre en nuestra lista. Revisa la ortografía o contáctanos.'
          : err.status === 409
            ? err.message
            : 'Ocurrió un error. Intenta de nuevo.'
      );
      setShowWhatsApp(err.status === 404);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[19rem] md:max-w-lg lg:max-w-xl"
      style={{ perspective: '1600px' }}
      animate={
        shake
          ? { x: [0, -10, 10, -8, 8, 0] }
          : isOpening
            ? { opacity: [1, 1, 1, 0], y: [0, 0, -8, -20] }
            : {}
      }
      transition={
        isOpening
          ? { duration: 3.8, times: [0, 0.6, 0.82, 1], ease: 'easeInOut' }
          : { duration: 0.4 }
      }
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[40%] z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,252,248,0.9) 0%, rgba(237,228,216,0.35) 45%, transparent 72%)',
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          isOpening
            ? { opacity: [0, 0, 0, 0.7, 0.3, 0], scale: [0.4, 0.4, 0.4, 1.6, 2.4, 3] }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 2.4, times: [0, 0.3, 0.45, 0.6, 0.78, 1], delay: 1.4, ease: 'easeOut' }}
      />

      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Pliegues laterales del sobre */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-16 z-[5] w-[48%] opacity-[0.18] md:top-20"
          style={{
            clipPath: 'polygon(0 0, 100% 45%, 0 100%)',
            background: 'linear-gradient(135deg, #8b7355, transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-16 z-[5] w-[48%] opacity-[0.18] md:top-20"
          style={{
            clipPath: 'polygon(100% 0, 0 45%, 100% 100%)',
            background: 'linear-gradient(225deg, #8b7355, transparent)',
          }}
        />

        {/* Carta interior — emerge desde dentro del sobre */}
        <motion.div
          className="absolute inset-x-4 top-[3.65rem] z-[15] mx-auto rounded-md border border-[#e8dfd2] bg-gradient-to-b from-[#fffcf8] to-[#f5efe6] px-4 py-4 shadow-[0_6px_24px_rgba(61,53,48,0.2)] md:inset-x-5 md:top-[4.75rem] md:px-5 md:py-5"
          style={{
            transformOrigin: 'center bottom',
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, y: 0, scaleY: 0.4, scaleX: 0.97 }}
          animate={
            isOpening
              ? {
                  opacity: [0, 0, 0.5, 1, 1],
                  y: [0, 0, 6, -36, -88],
                  scaleY: [0.4, 0.4, 0.55, 1, 1.03],
                  scaleX: [0.97, 0.97, 0.98, 1, 1.01],
                  rotateX: [14, 14, 10, 4, -4],
                }
              : { opacity: 0, y: 0, scaleY: 0.4, scaleX: 0.97 }
          }
          transition={{
            duration: 2.3,
            times: [0, 0.36, 0.5, 0.72, 1],
            delay: 0.95,
            ease: [0.25, 0.9, 0.35, 1],
          }}
        >
          <p className="text-center text-sm italic leading-relaxed text-[#4a4038] md:text-base">
            {DRAGON_QUOTE}
          </p>
          <p className="mt-3 text-center text-xs font-medium not-italic tracking-wide text-[#8b7355]">
            Shanty & Mateo
          </p>
        </motion.div>

        {/* Cuerpo del sobre */}
        <div
          className="relative z-10 min-h-[18.5rem] overflow-hidden rounded-lg border border-[#ddd2c4]/90 bg-gradient-to-b from-[#faf7f2]/96 via-[#f3ece3]/94 to-[#ebe3d8]/92 px-4 pb-7 pt-24 shadow-[0_10px_36px_rgba(61,53,48,0.18),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm md:min-h-[24rem] md:px-6 md:pb-10 md:pt-36"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[4.5rem] opacity-30"
            style={{
              clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
              background: 'linear-gradient(180deg, #d9cfc0, #b8a890)',
            }}
          />

          <AnimatePresence>
            {!isOpening && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, delay: 0.75 }}
                className="relative z-10"
              >
                <p className="mb-4 text-center text-base font-medium italic leading-snug text-[#3d3530] md:mb-6 md:text-lg md:leading-relaxed md:text-xl">
                  {DRAGON_QUOTE}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe tu nombre completo"
                    disabled={disabled || loading || isOpening}
                    className="w-full border-b border-[#c4b5a0] bg-white/50 px-2 py-2 text-center text-base italic text-[#3d3530] placeholder:text-[#8b7355]/45 focus:border-[#a88962] focus:outline-none disabled:opacity-50 md:py-2.5 md:text-lg"
                    autoComplete="name"
                  />

                  {error && (
                    <div className="space-y-3">
                      <p className="text-center text-sm font-medium italic text-[#8b7355]">{error}</p>
                      {showWhatsApp && (
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mx-auto block w-fit rounded-full border border-[#d4c4ae] bg-white/40 px-5 py-2 text-sm font-medium not-italic text-[#4a4038] transition hover:bg-white/60"
                        >
                          Escríbenos por WhatsApp
                        </a>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={disabled || loading || isOpening || !nombre.trim()}
                    className="mx-auto block rounded-full border border-[#d4c4ae] bg-gradient-to-r from-[#f5efe6] to-[#ebe0d0] px-8 py-2.5 text-sm font-medium italic text-[#4a4038] shadow-[0_3px_14px_rgba(139,115,85,0.2)] transition hover:from-[#faf5ee] hover:to-[#f0e6d8] disabled:cursor-not-allowed disabled:opacity-40 md:px-10 md:py-3 md:text-base"
                  >
                    {loading ? 'Verificando…' : 'Abrir invitación'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Solapa triangular — apertura en 3D más pausada y realista */}
        <motion.div
          className="absolute left-0 right-0 top-0 z-30 h-16 origin-top md:h-20"
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          animate={
            isOpening
              ? {
                  rotateX: [0, 0, -8, -55, -130, -178],
                  y: [0, 0, 0, -2, -6, -10],
                  z: [0, 0, 2, 8, 14, 18],
                }
              : { rotateX: 0, y: 0, z: 0 }
          }
          transition={{
            duration: 2.1,
            times: [0, 0.28, 0.4, 0.58, 0.78, 1],
            delay: 0.72,
            ease: [0.33, 0.9, 0.4, 1],
          }}
        >
          <div
            className="h-full w-full"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              background: 'linear-gradient(180deg, #faf7f2 0%, #ede4d8 50%, #d9cfc0 100%)',
              borderBottom: '1px solid rgba(180,160,130,0.55)',
              boxShadow: '0 6px 20px rgba(61,53,48,0.12)',
            }}
          />
        </motion.div>

        <EnvelopeSealBreak isOpening={isOpening} />

        {isOpening &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute left-1/2 top-9 z-50 h-1.5 w-1.5 rounded-full bg-[#faf7f2] md:top-12"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0, 1, 0],
                scale: [0, 0, 1.2, 0],
                x: Math.cos((i / 6) * Math.PI * 2) * (40 + i * 6),
                y: Math.sin((i / 6) * Math.PI * 2) * (32 + i * 5) - 16,
              }}
              transition={{ duration: 0.9, delay: 0.48 + i * 0.05, ease: 'easeOut' }}
            />
          ))}
      </div>
    </motion.div>
  );
}
