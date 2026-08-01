import { useRef, useState } from 'react';
import { Check, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import Countdown from './Countdown';
import { fireConfetti } from '@/lib/confetti';

type HeroProps = {
  partnerName: string;
  onChangeName: (name: string) => void;
};

export default function Hero({ partnerName, onChangeName }: HeroProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(partnerName);
  const inputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const clean = draft.trim().slice(0, 28);
    onChangeName(clean.length > 0 ? clean : partnerName);
    setEditing(false);
  };

  const openEditor = () => {
    setDraft(partnerName);
    setEditing(true);
    window.setTimeout(() => inputRef.current?.select(), 20);
  };

  return (
    <section id="atas" className="relative z-10 pb-8 pt-10 sm:pt-16">
      <div className="shell text-center">
        <div className="reveal is-visible mx-auto max-w-3xl">
          <h1 className="font-display text-[clamp(2.2rem,6vw,4.2rem)] font-black leading-[1.05] tracking-tight text-ink">
            Dedikasi Spesial Untuk
          </h1>

          {editing ? (
            <div className="mt-2 flex items-center justify-center gap-2">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') save();
                  if (e.key === 'Escape') setEditing(false);
                }}
                maxLength={28}
                aria-label="Nama pasangan"
                className="w-full max-w-md rounded-2xl border-2 border-rose-200 bg-white px-4 py-2 text-center font-display text-[clamp(1.8rem,5vw,3.4rem)] font-black text-rose-600 outline-none focus:border-rose-400"
              />
              <button
                type="button"
                onClick={save}
                aria-label="Simpan nama"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rose-500 text-white shadow-glow transition hover:bg-rose-600"
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openEditor}
              title="Klik untuk ganti nama pasanganmu"
              className="group mt-1 inline-flex items-center gap-3"
            >
              <span className="gradient-text font-display text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.05] tracking-tight underline decoration-rose-200 decoration-dashed underline-offset-8">
                {partnerName}
              </span>
              <Pencil className="h-5 w-5 shrink-0 text-rose-300 opacity-0 transition group-hover:opacity-100" />
            </button>
          )}

          <div className="anim-bobble mt-3 text-3xl">💖</div>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70">
            Website interaktif khusus buat pacar tersayang yang paling cantik, gemesin, dan selalu
            bikin hari-hari berbunga setiap detik. 🌸
          </p>
        </div>

        <div className="reveal mt-9">
          <Countdown />
        </div>

        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/alasan" className="btn-primary">
            Mulai Petualangan Manis 💕
          </Link>
          <button
            type="button"
            className="btn-ghost"
            onClick={(e) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              fireConfetti({ originX: rect.left + rect.width / 2, originY: rect.top, count: 70 });
            }}
          >
            Tebar Hati ✨
          </button>
        </div>
      </div>
    </section>
  );
}
