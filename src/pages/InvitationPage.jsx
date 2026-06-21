import { useState } from 'react';
import { motion } from 'framer-motion';
import DragonSilhouettes from '../components/DragonSilhouettes';
import PhotoGallery, { MobilePhotoStrip, ClosingPhoto } from '../components/PhotoGallery';
import PhotoLightbox from '../components/PhotoLightbox';
import WaterContainer from '../components/WaterContainer';
import InvitationContent from '../components/InvitationContent';
import WaterDrops from '../components/WaterDrops';

export default function InvitationPage({ guest, onBackToEnvelope }) {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/assets/intro/introduccion_1.jpg')" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-warm-bg/80 via-warm-bg/90 to-warm-bg" />

      {/* Botón temporal — quitar en producción */}
      <button
        type="button"
        onClick={onBackToEnvelope}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-bronze/40 bg-warm-bg/90 px-4 py-2 text-xs not-italic text-warm-gray shadow-md backdrop-blur-sm transition hover:bg-champagne/30"
      >
        ← Volver al sobre
      </button>

      <DragonSilhouettes />
      <PhotoGallery onPhotoOpen={setActivePhoto} />
      <PhotoLightbox src={activePhoto} onClose={() => setActivePhoto(null)} />
      <WaterDrops />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 px-4 py-12 md:py-20"
      >
        <MobilePhotoStrip onPhotoOpen={setActivePhoto} />

        <WaterContainer>
          <InvitationContent guest={guest} />
        </WaterContainer>

        <ClosingPhoto onPhotoOpen={setActivePhoto} />
      </motion.main>
    </div>
  );
}
