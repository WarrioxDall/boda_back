import RsvpButton from './RsvpButton';
import LluviaSobresDecor from './LluviaSobresDecor';
import TrebleClefIcon from '../icons/TrebleClefIcon';
import MapPinIcon from '../icons/MapPinIcon';
import DressCodePalette from './DressCodePalette';

export default function InvitationContent({ guest }) {
  return (
    <div className="space-y-5 text-center italic leading-relaxed text-warm-text md:space-y-6 md:text-lg">
      {guest?.nombre && (
        <p className="text-2xl font-medium italic tracking-wide text-warm-text md:text-3xl">
          {guest.nombre}
        </p>
      )}

      <p>
        Después de muchas risas, música, aventuras y amor…
        <br />
        llegó el momento de celebrar nuestra boda. ✨
      </p>

      <p>
        Queremos compartir esta noche tan especial con las personas que más queremos.
      </p>

      <p className="font-display text-3xl font-medium italic tracking-[0.06em] text-warm-text md:text-4xl">
        Shanty & Mateo
      </p>

      <div className="space-y-1 text-base not-italic md:text-lg">
        <p className="font-medium italic">28 de diciembre · 5:00 p.m.</p>
        <p className="italic">
          <a
            href="https://maps.app.goo.gl/yPLPKWFSvbEddEsD6?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 underline decoration-champagne/50 underline-offset-2 transition hover:text-bronze"
          >
            <MapPinIcon className="h-4 w-4 shrink-0 text-bronze/75" />
            Hotel Monarch Campestre · Llanogrande
          </a>
        </p>
      </div>

      <p>
        Prepárense para una noche de buena música, baile, luces y mucho amor.
        <br />
        Evento solo para adultos.
      </p>

      <div className="relative mx-auto max-w-sm space-y-1 rounded-xl border border-champagne/30 bg-white/10 px-4 py-4 text-base not-italic">
        <span className="absolute -right-2 -top-3 text-3xl opacity-40" aria-hidden="true">♪</span>
        <TrebleClefIcon className="absolute -bottom-3 -left-3 h-12 w-8 text-bronze/50" />
        <p>
          <span className="font-medium not-italic">Dress code:</span> Formal elegante
        </p>
        <p>
          <span className="font-medium not-italic">Concepto:</span> Romantic Disco Glam ✨
        </p>
        <p className="text-sm italic md:text-base">
          Tonos neutros, champagne y grises cálidos serán bienvenidos.
          <br />
          Sugerimos evitar colores muy vibrantes o tropicales.
        </p>
        <DressCodePalette />
      </div>

      <p>
        <span className="inline-flex items-center justify-center gap-2">
          Lluvia de sobres
          <LluviaSobresDecor />
        </span>
        <br />
        La celebración terminará a las 11:00 p.m.
      </p>

      <RsvpButton guest={guest} />
    </div>
  );
}
