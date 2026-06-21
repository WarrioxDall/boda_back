const PHOTOS = [
  { src: '/assets/body/cuerpo.jpg', className: 'left-[-2%] top-[5%] w-52 -rotate-3 xl:w-64 2xl:w-72' },
  { src: '/assets/body/cuerpo_2.jpg', className: 'left-[1%] bottom-[15%] w-48 rotate-2 xl:w-60 2xl:w-72' },
  { src: '/assets/body/cuerpo_3.jpg', className: 'right-[1%] top-[8%] w-52 -rotate-1 xl:w-64 2xl:w-72' },
  { src: '/assets/body/cuerpo_4.jpg', className: 'right-[-2%] bottom-[12%] z-[1] w-48 rotate-3 xl:w-60 2xl:w-72' },
];

function PhotoShade({ className = '' }) {
  return (
    <>
      <div className={`pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_48px_rgba(45,38,32,0.4)] ${className}`} />
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-[28%] rounded-l-xl bg-gradient-to-r from-black/30 to-transparent ${className}`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-[28%] rounded-r-xl bg-gradient-to-l from-black/30 to-transparent ${className}`} />
    </>
  );
}

function PhotoButton({ src, className, imgClassName = '', onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className={`group pointer-events-auto relative cursor-pointer border-0 bg-transparent p-0 text-left transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60 focus-visible:ring-offset-2 ${className}`}
      aria-label="Ver foto ampliada"
    >
      <img
        src={src}
        alt=""
        className={`rounded-xl shadow-[0_8px_32px_rgba(61,53,48,0.22)] opacity-90 transition group-hover:opacity-100 ${imgClassName}`}
        loading="lazy"
      />
      <PhotoShade />
      <span className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-xl bg-gradient-to-t from-black/25 to-transparent pb-2 opacity-70 transition lg:opacity-0 lg:group-hover:opacity-100">
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] not-italic text-white/90 backdrop-blur-sm">
          Ver foto
        </span>
      </span>
    </button>
  );
}

export default function PhotoGallery({ onPhotoOpen }) {
  if (!onPhotoOpen) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      <div className="relative mx-auto h-full max-w-7xl">
        {PHOTOS.map((photo) => (
          <div key={photo.src} className={`absolute ${photo.className}`}>
            <PhotoButton src={photo.src} onOpen={onPhotoOpen} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobilePhotoStrip({ onPhotoOpen }) {
  if (!onPhotoOpen) return null;

  return (
    <div className="mb-8 flex max-w-full gap-4 overflow-x-auto pb-2 lg:hidden">
      {PHOTOS.map((photo) => (
        <PhotoButton
          key={photo.src}
          src={photo.src}
          onOpen={onPhotoOpen}
          className="h-40 w-32 shrink-0 md:h-48 md:w-36"
          imgClassName="h-full w-full object-cover shadow-lg"
        />
      ))}
    </div>
  );
}

const CLOSING_PHOTO = '/assets/closing/cierre.jpg';

export function ClosingPhoto({ onPhotoOpen }) {
  if (!onPhotoOpen) return null;

  return (
    <div className="mx-auto mt-12 max-w-md">
      <PhotoButton
        src={CLOSING_PHOTO}
        onOpen={onPhotoOpen}
        className="w-full"
        imgClassName="w-full rounded-xl shadow-lg opacity-90"
      />
    </div>
  );
}
