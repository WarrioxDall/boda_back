import { useState, useEffect, useCallback } from 'react';
import {
  getGuestSession,
  saveGuestSession,
  fetchGuestMe,
  hasSeenEnvelope,
  markEnvelopeSeen,
  resetEnvelopeView,
  clearGuestSession,
} from '../api/client';

export function useGuestSession() {
  const [guest, setGuest] = useState(() => getGuestSession());
  const [loading, setLoading] = useState(true);
  const [envelopeSeen, setEnvelopeSeen] = useState(() => hasSeenEnvelope());

  useEffect(() => {
    const session = getGuestSession();
    if (!session) {
      setLoading(false);
      return;
    }

    fetchGuestMe()
      .then((data) => {
        setGuest(data);
        saveGuestSession(data);
      })
      .catch(() => {
        clearGuestSession();
        setGuest(null);
        setEnvelopeSeen(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const setGuestSession = useCallback((guestData) => {
    saveGuestSession(guestData);
    setGuest(guestData);
  }, []);

  const markSeen = useCallback(() => {
    markEnvelopeSeen();
    setEnvelopeSeen(true);
  }, []);

  const backToEnvelope = useCallback(() => {
    resetEnvelopeView();
    setEnvelopeSeen(false);
  }, []);

  return { guest, loading, envelopeSeen, setGuestSession, markSeen, backToEnvelope };
}
