import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { MOMENTS, type Moment } from '@/data/content';

const TILTS = ['-5deg', '4deg', '-3deg', '6deg'];

export default function Gallery() {
  const [active, setActive] = useState<Moment | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="momen" className="relative z-10 py-16 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Kenangan Kita"
          title="Momen Indah Bersamamu"
          subtitle="Setiap kartu di bawah ini adalah momen kecil yang selalu bikin senyum sendiri. Klik untuk memperbesar."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MOMENTS.map((moment, i) => (
            <button
              key={moment.id}
              type="button"
              onClick={() => setActive(moment)}
              className="reveal group rounded-[18px] bg-white p-3 pb-5 text-left shadow-soft transition-all duration-500 hover:z-20 hover:!rotate-0 hover:-translate-y-2 hover:shadow-lift"
              style={{ transform: `rotate(${TILTS[i % TILTS.length]})`, transitionDelay: `${i * 70}ms` }}
            >
              <div className="overflow-hidden rounded-[12px] bg-rose-50">
                <img
                  src={moment.image}
                  alt={moment.caption}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 px-1 text-sm font-bold text-ink">{moment.caption}</p>
              <p className="mt-0.5 px-1 font-hand text-base text-rose-500">{moment.note}</p>
            </button>
          ))}
        </div>
      </div>

      {active
        ? createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => setActive(null)}
            className="absolute inset-0 cursor-zoom-out bg-white/10 backdrop-blur-lg"
          />
          <figure className="anim-pop relative w-full max-w-lg rounded-4xl bg-white p-4 pb-6 shadow-lift">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Tutup gambar"
              className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-rose-500 text-white shadow-glow transition hover:bg-rose-600"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={active.image}
              alt={active.caption}
              className="w-full rounded-3xl object-cover"
            />
            <figcaption className="mt-4 text-center">
              <p className="font-display text-xl font-bold text-ink">{active.caption}</p>
              <p className="mt-1 font-hand text-lg text-rose-500">{active.note}</p>
            </figcaption>
          </figure>
        </div>,
            document.body,
          )
        : null}
    </section>
  );
}
