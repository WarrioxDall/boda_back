import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { confirmRsvp, fetchRsvpStatus } from '../api/client';

export default function RsvpButton({ guest }) {
  const [confirmado, setConfirmado] = useState(guest?.confirmado ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!guest?.id) return;

    fetchRsvpStatus(guest.id)
      .then((data) => setConfirmado(data.confirmado))
      .catch(() => {});
  }, [guest?.id]);

  const handleConfirm = async () => {
    if (confirmado || loading || !guest?.id) return;

    setLoading(true);
    setError('');

    try {
      await confirmRsvp(guest.id);
      setConfirmado(true);
    } catch (err) {
      if (err.status === 409) {
        setConfirmado(true);
      } else {
        setError('No pudimos registrar tu confirmación. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (confirmado) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-xl border border-champagne/50 bg-champagne/20 px-6 py-5"
      >
        <p className="text-lg font-medium not-italic text-warm-text">
          ¡Gracias por confirmar, {guest?.nombre?.split(' ')[0]}!
        </p>
        <p className="mt-1 italic text-warm-gray">
          Nos vemos el 28 de diciembre.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="cursor-pointer rounded-full border border-bronze/60 bg-gradient-to-r from-champagne/40 to-champagne-light/50 px-10 py-3 text-lg not-italic font-medium text-warm-text shadow-[0_4px_20px_rgba(196,168,130,0.35)] transition hover:from-champagne/60 hover:to-champagne-light/70 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Confirmando…' : 'Confirmar asistencia'}
      </button>
      {error && <p className="text-sm italic text-warm-gray">{error}</p>}
    </div>
  );
}
