import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGuestSession } from './hooks/useGuestSession';
import IntroPage from './pages/IntroPage';
import IntroRevealPage from './pages/IntroRevealPage';
import InvitationPage from './pages/InvitationPage';

export default function App() {
  const { guest, loading, envelopeSeen, setGuestSession, markSeen, backToEnvelope } =
    useGuestSession();
  const [phase, setPhase] = useState('intro');

  useEffect(() => {
    if (!loading && guest && envelopeSeen) {
      setPhase((current) => (current === 'intro' ? 'invitation' : current));
    }
  }, [loading, guest, envelopeSeen]);

  const handleGuestValidated = (guestData) => {
    setGuestSession(guestData);
    markSeen();
    setPhase('reveal');
  };

  const handleRevealComplete = () => {
    setPhase('invitation');
  };

  const handleBackToEnvelope = () => {
    backToEnvelope();
    setPhase('intro');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic text-warm-gray">
        Cargando…
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {phase === 'invitation' && guest ? (
        <motion.div
          key="invitation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <InvitationPage guest={guest} onBackToEnvelope={handleBackToEnvelope} />
        </motion.div>
      ) : phase === 'reveal' && guest ? (
        <motion.div
          key="reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <IntroRevealPage onComplete={handleRevealComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IntroPage onGuestValidated={handleGuestValidated} guest={guest} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
