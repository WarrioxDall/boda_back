export default function WaterContainer({ children }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Water shimmer ring */}
      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-champagne-light/30 via-transparent to-champagne/20 blur-sm" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-white/30 via-champagne-light/20 to-champagne/10 p-8 shadow-[0_8px_40px_rgba(196,168,130,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl md:p-12">
        {/* Inner water ripple */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 20% 30%, rgba(255,248,240,0.5) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(232,213,183,0.3) 0%, transparent 45%)',
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
