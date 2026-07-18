import { marqueeRow1, marqueeRow2 } from '../data';

type Props = { className?: string };

const iconUrl = (slug: string) => `https://skillicons.dev/icons?i=${slug}&theme=dark`;

export default function TechMarquee({ className = '' }: Props) {
  const row1 = [...marqueeRow1, ...marqueeRow1];
  const row2 = [...marqueeRow2, ...marqueeRow2];

  return (
    <div className={`glass glass-ripple scanlines relative flex min-h-0 flex-col overflow-hidden rounded-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-teal/10 bg-mantle/40 px-3 py-1.5">
        <span className="bar-dot bg-sky" />
        <span className="truncate text-[11px] font-medium text-text">
          <span className="text-sky">marquee</span>
          <span className="ml-2 text-overlay1">— tech stack · 2 tracks</span>
        </span>
        <span className="ml-auto text-[10px] text-overlay0">loop ∞</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 py-2">
        <div className="marquee-pause relative overflow-hidden">
          <div className="marquee-track gap-2">
            {row1.map((s, i) => (
              <img key={`r1-${i}`} src={iconUrl(s)} alt={s} loading="lazy" className="mx-1.5 h-9 w-9 shrink-0" />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-crust to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-crust to-transparent" />
        </div>

        <div className="marquee-pause relative overflow-hidden">
          <div className="marquee-track reverse gap-2">
            {row2.map((s, i) => (
              <img key={`r2-${i}`} src={iconUrl(s)} alt={s} loading="lazy" className="mx-1.5 h-9 w-9 shrink-0" />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-crust to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-crust to-transparent" />
        </div>
      </div>
    </div>
  );
}
