import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);
}

function unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

export default function PhotoLightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    lockScroll();
    window.addEventListener('keydown', onKeyDown);

    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [src, onClose]);

  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[200] flex max-w-[100vw] items-center justify-center overflow-hidden p-4"
          style={{ height: '100dvh', width: '100vw' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          <motion.div
            className="absolute inset-0 bg-[#2a2420]/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.button
            type="button"
            className="absolute z-10 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-sm not-italic text-white/90 backdrop-blur-sm transition hover:bg-black/45"
            style={{
              top: 'max(1rem, env(safe-area-inset-top))',
              right: 'max(1rem, env(safe-area-inset-right))',
            }}
            onClick={onClose}
            aria-label="Cerrar"
          >
            Cerrar
          </motion.button>

          <motion.img
            src={src}
            alt=""
            className="relative z-[1] max-h-[min(85dvh,85vh)] w-auto max-w-[min(calc(100vw-2rem),100%)] rounded-2xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
