import { useId } from 'react';

/** Sello de cera con media luna. Edita colores en este archivo. */
export default function EnvelopeMoonSeal({ className = 'h-14 w-14' }) {
  const waxId = useId().replace(/:/g, '');
  const shineId = useId().replace(/:/g, '');
  const moonMaskId = useId().replace(/:/g, '');

  return (
    <svg
      className={className}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={waxId} cx="0.35" cy="0.28" r="0.72">
          <stop stopColor="#d4bc96" />
          <stop offset="0.55" stopColor="#a07850" />
          <stop offset="1" stopColor="#6e4e32" />
        </radialGradient>
        <radialGradient id={shineId} cx="0.28" cy="0.22" r="0.48">
          <stop stopColor="#fff8f0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff8f0" stopOpacity="0" />
        </radialGradient>
        <mask id={moonMaskId}>
          <rect width="52" height="52" fill="black" />
          <circle cx="26" cy="26" r="10.5" fill="white" />
          <circle cx="29.5" cy="26" r="9" fill="black" />
        </mask>
      </defs>

      <circle cx="26" cy="26" r="24" fill={`url(#${waxId})`} stroke="#5a3f28" strokeWidth="1.3" />
      <circle cx="26" cy="26" r="21" stroke="#8b6340" strokeWidth="0.55" opacity="0.55" />
      <ellipse cx="18" cy="15" rx="10" ry="6.5" fill={`url(#${shineId})`} />

      <circle cx="26" cy="26" r="10.5" fill="#fff8f0" mask={`url(#${moonMaskId})`} />
      <circle cx="22.5" cy="22" r="1" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
