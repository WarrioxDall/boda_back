/** SVG decorativo para "Lluvia de sobres" — edita paths/colores aquí para personalizarlo. */
export default function LluviaSobresIcon({ className = 'h-7 w-7' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lluviaEnvGrad" x1="8" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5ebe0" />
          <stop offset="0.5" stopColor="#e8d5b7" />
          <stop offset="1" stopColor="#c4a882" />
        </linearGradient>
        <linearGradient id="lluviaFlapGrad" x1="32" y1="8" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff8f0" />
          <stop offset="1" stopColor="#dcc9a8" />
        </linearGradient>
        <linearGradient id="lluviaHeartGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c4a882" />
          <stop offset="1" stopColor="#8b7355" />
        </linearGradient>
      </defs>

      {/* Estrellas / brillo */}
      <path
        d="M10 14 11.2 17.2 14.5 17.5 12 19.8 12.8 23 10 21.2 7.2 23 8 19.8 5.5 17.5 8.8 17.2Z"
        fill="#e8d5b7"
        opacity="0.9"
      />
      <path
        d="M52 10 52.8 12.4 55.2 12.7 53.4 14.4 54 16.8 52 15.4 50 16.8 50.6 14.4 48.8 12.7 51.2 12.4Z"
        fill="#f0dcc0"
        opacity="0.85"
      />
      <circle cx="18" cy="8" r="1.2" fill="#dcc9a8" opacity="0.7" />
      <circle cx="48" cy="22" r="1" fill="#e8d5b7" opacity="0.6" />

      {/* Sobre principal — formas curvas */}
      <path
        d="M10 26c0-2.2 1.8-4 4-4h36c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H14c-2.2 0-4-1.8-4-4V26Z"
        fill="url(#lluviaEnvGrad)"
        stroke="#b89968"
        strokeWidth="1.2"
      />
      <path
        d="M10 30c8 6 16 9 22 9s14-3 22-9"
        stroke="#c4a882"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M10 26 32 42 54 26"
        fill="url(#lluviaFlapGrad)"
        stroke="#b89968"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M28 38c2 3 6 3 8 0"
        stroke="#a88962"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* Sobre cayendo 1 */}
      <g transform="translate(4 34) rotate(-18)" opacity="0.85">
        <path
          d="M4 6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6Z"
          fill="#f5ebe0"
          stroke="#c4a882"
          strokeWidth="0.8"
        />
        <path d="M4 8 12 14 20 8" fill="#ede0cc" stroke="#c4a882" strokeWidth="0.7" />
      </g>

      {/* Sobre cayendo 2 */}
      <g transform="translate(46 36) rotate(14)" opacity="0.8">
        <path
          d="M4 6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6Z"
          fill="#faf6f0"
          stroke="#dcc9a8"
          strokeWidth="0.8"
        />
        <path d="M4 8 11 13 18 8" fill="#f0e6d8" stroke="#dcc9a8" strokeWidth="0.7" />
      </g>

      {/* Corazón sello */}
      <path
        d="M32 33c-2.5-3.5-8-2.2-8 2.2 0 4.8 8 8.8 8 8.8s8-4 8-8.8c0-4.4-5.5-5.7-8-2.2Z"
        fill="url(#lluviaHeartGrad)"
        opacity="0.85"
      />

      {/* Líneas de “lluvia” */}
      <path
        d="M14 52v5M20 50v6M26 53v4M38 51v5M44 49v6M50 52v4"
        stroke="#c4a882"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
