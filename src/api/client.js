const API_BASE = import.meta.env.VITE_API_URL ?? '';

const GUEST_ID_KEY = 'boda_guest_id';
const GUEST_NAME_KEY = 'boda_guest_name';
const ENVELOPE_SEEN_KEY = 'boda_envelope_seen';

function getHeaders() {
  const guestId = sessionStorage.getItem(GUEST_ID_KEY);
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
  sessionStorage.setItem(GUEST_ID_KEY, String(guest.id));
  sessionStorage.setItem(GUEST_NAME_KEY, guest.nombre);
}

export function getGuestSession() {
  const id = sessionStorage.getItem(GUEST_ID_KEY);
  const nombre = sessionStorage.getItem(GUEST_NAME_KEY);
  if (!id) return null;
  return { id: Number(id), nombre };
}

export function markEnvelopeSeen() {
  sessionStorage.setItem(ENVELOPE_SEEN_KEY, 'true');
}

export function hasSeenEnvelope() {
  return sessionStorage.getItem(ENVELOPE_SEEN_KEY) === 'true';
}

/** Temporal: volver a la pantalla del sobre sin cerrar sesión del invitado */
export function resetEnvelopeView() {
  sessionStorage.removeItem(ENVELOPE_SEEN_KEY);
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
