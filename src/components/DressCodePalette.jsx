export const DRESS_CODE_COLORS = [
  '#EAD7C1',
  '#DDB7BD',
  '#E6D7C3',
  '#DCD8D2',
  '#BDAA96',
  '#8FA3B2',
];

const PALETTE_OVERLAY = '/assets/dress-code/paleta_pintor_overlay.png';

export default function DressCodePalette() {
  return (
    <div className="mx-auto mt-4 flex items-center justify-center gap-4">
      <img
        src={PALETTE_OVERLAY}
        alt=""
        className="h-[72px] w-[72px] shrink-0 object-contain opacity-70"
        loading="lazy"
      />
      <div
        className="grid grid-cols-3 gap-2"
        aria-label="Colores sugeridos para el dress code"
        role="list"
      >
        {DRESS_CODE_COLORS.map((hex) => (
          <span
            key={hex}
            role="listitem"
            className="h-7 w-7 rounded-full border border-champagne/35 shadow-sm"
            style={{ backgroundColor: hex }}
            title={hex}
          />
        ))}
      </div>
    </div>
  );
}
