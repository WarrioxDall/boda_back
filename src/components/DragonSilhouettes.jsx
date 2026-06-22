/**
 * Siluetas de dragones en los bordes (siluetas PNG procesadas).
 */
const SILHOUETTES = [
  {
    id: 'chimuelos',
    src: '/assets/dragons/silhouettes/Chimuelos-silhouette.png',
    alt: 'Dos dragones bajo la luna',
    className: 'left-[-3%] top-[2%] w-56 -rotate-6 md:w-72 lg:w-80 xl:w-[22rem]',
  },
  {
    id: 'dragonconluna',
    src: '/assets/dragons/silhouettes/DragonconLuna-silhouette.png',
    alt: 'Dragón con la luna',
    className: 'right-[-4%] top-[8%] w-60 rotate-4 md:w-72 lg:w-96 xl:w-[26rem]',
  },
  {
    id: 'dragon_luna',
    src: '/assets/dragons/silhouettes/Dragon_luna-silhouette.png',
    alt: '',
    className: 'left-[0%] bottom-[2%] w-44 md:w-56 lg:w-64 xl:w-72',
  },
  {
    id: 'dragonmontania',
    src: '/assets/dragons/silhouettes/DragonMontania-silhouette.png',
    alt: '',
    className: 'right-[0%] bottom-[2%] w-40 md:w-52 lg:w-60 xl:w-72',
  },
];

export default function DragonSilhouettes() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      {SILHOUETTES.map((dragon) => (
        <img
          key={dragon.id}
          src={dragon.src}
          alt={dragon.alt}
          className={`absolute mix-blend-multiply opacity-[0.35] ${dragon.className}`}
          loading="lazy"
        />
      ))}
    </div>
  );
}
