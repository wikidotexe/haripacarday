import { useState } from 'react';
import { fireConfetti } from '@/lib/confetti';

const DODGE_TEXTS = [
  'Nggak',
  'Yakin?',
  'Coba lagi',
  'Nggak bisa 😌',
  'Susah ya?',
  'Kabur dulu',
  'Nyerah aja',
];

type FinalCTAProps = {
  partnerName: string;
};

export default function FinalCTA({ partnerName }: FinalCTAProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const dodge = () => {
    setDodges((d) => d + 1);
    setOffset({
      x: Math.round((Math.random() - 0.5) * 260),
      y: Math.round((Math.random() - 0.5) * 120),
    });
  };

  const accept = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    fireConfetti({
      originX: rect.left + rect.width / 2,
      originY: rect.top + rect.height / 2,
      count: 150,
    });
    setAccepted(true);
  };

  return (
    <section id="ajakan" className="relative z-10 py-16 sm:py-24">
      <div className="shell">
        <div className="reveal relative overflow-hidden rounded-5xl bg-gradient-to-br from-rose-500 via-rose-600 to-grape-500 px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <span className="anim-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/15 blur-2xl" />
          <span className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <span className="pointer-events-none absolute -bottom-12 right-0 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

          <p className="relative text-[11px] font-extrabold uppercase tracking-[0.28em] text-white/80">
            Pertanyaan Penting
          </p>

          {!accepted ? (
            <>
              <h2 className="relative mt-4 font-display text-[clamp(1.9rem,5.2vw,3.4rem)] font-black leading-tight text-white">
                Mau Jadi Pacarku
                <br />
                Selamanya?
              </h2>
              <p className="relative mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/85">
                Di Hari Pacar Sedunia ini, aku cuma mau minta satu hal: kamu tetap terus jadi
                pasanganku selamanya. Gak boleh tolak ya! 🥺
              </p>

              <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={accept}
                  className="rounded-full bg-white px-9 py-4 text-sm font-extrabold text-rose-600 shadow-lift transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  IYA, MAU BANGET! 💖
                </button>

                <button
                  type="button"
                  onMouseEnter={dodge}
                  onFocus={dodge}
                  onClick={dodge}
                  className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-bold text-white/90 transition-transform duration-300 ease-out hover:bg-white/10"
                  style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                >
                  {DODGE_TEXTS[Math.min(dodges, DODGE_TEXTS.length - 1)]}
                </button>
              </div>

              {dodges >= 3 ? (
                <p className="relative mt-6 font-hand text-xl text-white/90">
                  tuh kan, tombolnya aja tahu jawabannya cuma satu ~
                </p>
              ) : null}
            </>
          ) : (
            <div className="anim-pop relative">
              <div className="text-6xl">💞</div>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,5vw,3.2rem)] font-black leading-tight text-white">
                Yeay! Makasih ya, {partnerName.split(' ')[0]}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/90">
                Janji ini bukan cuma buat hari ini. Aku bakal terus pilih kamu — di hari yang
                gampang maupun yang berantakan. Selamat Hari Pacar Sedunia, sayang. 🌸
              </p>
              <button
                type="button"
                onClick={() => {
                  setAccepted(false);
                  setDodges(0);
                  setOffset({ x: 0, y: 0 });
                }}
                className="mt-8 rounded-full border border-white/50 px-7 py-3 text-sm font-bold text-white/90 transition hover:bg-white/10"
              >
                Ulangi momennya 🔁
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
