const API_BASE = import.meta.env.VITE_API_URL ?? '';

const GUEST_ID_KEY = 'boda_guest_id';
const GUEST_NAME_KEY = 'boda_guest_name';
const ENVELOPE_SEEN_KEY = 'boda_envelope_seen';

const storage = localStorage;

function migrateSessionToLocal() {
  for (const key of [GUEST_ID_KEY, GUEST_NAME_KEY, ENVELOPE_SEEN_KEY]) {
    const sessionVal = sessionStorage.getItem(key);
    if (sessionVal && !storage.getItem(key)) {
      storage.setItem(key, sessionVal);
    }
    sessionStorage.removeItem(key);
  }
}

migrateSessionToLocal();

function getHeaders() {
  const guestId = storage.getItem(GUEST_ID_KEY);
  return guestId ? { 'X-Guest-Id': guestId } : {};
}

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.error || 'Error de conexión');
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function saveGuestSession(guest) {
  storage.setItem(GUEST_ID_KEY, String(guest.id));
  storage.setItem(GUEST_NAME_KEY, guest.nombre);
}

export function getGuestSession() {
  const id = storage.getItem(GUEST_ID_KEY);
  const nombre = storage.getItem(GUEST_NAME_KEY);
  if (!id) return null;
  return { id: Number(id), nombre };
}

export function clearGuestSession() {
  storage.removeItem(GUEST_ID_KEY);
  storage.removeItem(GUEST_NAME_KEY);
  storage.removeItem(ENVELOPE_SEEN_KEY);
}

export function markEnvelopeSeen() {
  storage.setItem(ENVELOPE_SEEN_KEY, 'true');
}

export function hasSeenEnvelope() {
  return storage.getItem(ENVELOPE_SEEN_KEY) === 'true';
}

/** Temporal: volver a la pantalla del sobre sin cerrar sesión del invitado */
export function resetEnvelopeView() {
  storage.removeItem(ENVELOPE_SEEN_KEY);
}

export function validateGuest(nombre) {
  return request('/api/guests/validate', {
    method: 'POST',
    body: JSON.stringify({ nombre }),
  });
}

export function fetchGuestMe() {
  return request('/api/guests/me');
}

export function fetchRsvpStatus(guestId) {
  return request(`/api/rsvp/status/${guestId}`);
}

export function confirmRsvp(guestId) {
  return request('/api/rsvp/confirm', {
    method: 'POST',
    body: JSON.stringify({ guestId }),
  });
}
