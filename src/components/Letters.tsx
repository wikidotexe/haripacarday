import { useState } from 'react';
import { Check, Copy, Heart, Mail } from 'lucide-react';
import Modal from './Modal';
import SectionHeading from './SectionHeading';
import { fireConfetti } from '@/lib/confetti';
import { LETTERS } from '@/data/content';

export type GreetingCard = {
  from: string;
  to: string;
  message: string;
};

type LettersProps = {
  card: GreetingCard | null;
  onSaveCard: (card: GreetingCard) => void;
};

export default function Letters({ card, onSaveCard }: LettersProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [from, setFrom] = useState(card?.from ?? '');
  const [to, setTo] = useState(card?.to ?? '');
  const [message, setMessage] = useState(card?.message ?? '');
  const [copied, setCopied] = useState(false);

  const preview = card;

  const submit = () => {
    if (from.trim().length === 0 || to.trim().length === 0 || message.trim().length === 0) return;
    onSaveCard({ from: from.trim(), to: to.trim(), message: message.trim() });
    setModalOpen(false);
    fireConfetti({ count: 80 });
  };

  const copyCard = async () => {
    if (!preview) return;
    const text = `Untuk ${preview.to},\n\n${preview.message}\n\n— ${preview.from} 💖\n(Selamat Hari Pacar Sedunia)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="surat" className="relative z-10 py-16 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Surat Cinta"
          title="Pesan Khusus Untuk Hari Pacar Sedunia"
          subtitle="Dua surat yang ditulis pelan-pelan, bukan buru-buru. Klik untuk membacanya sampai habis."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {LETTERS.map((letter, i) => {
            const open = openId === letter.id;
            return (
              <article
                key={letter.id}
                className="reveal relative overflow-hidden rounded-4xl border border-rose-100 bg-white/90 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-500 via-rose-400 to-grape-500" />
                <Heart className="absolute right-6 top-6 h-5 w-5 fill-rose-200 text-rose-200" />

                <h3 className="pr-10 font-display text-xl font-bold text-ink">{letter.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{letter.preview}</p>

                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4 space-y-3 border-t border-dashed border-rose-100 pt-4">
                      {letter.body.map((par, k) => (
                        <p key={k} className="text-sm leading-relaxed text-ink/75">
                          {par}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : letter.id)}
                  aria-expanded={open}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-rose-500 transition hover:text-rose-600"
                >
                  <Mail className="h-4 w-4" />
                  {open ? 'Tutup surat' : 'Buka surat'}
                </button>
              </article>
            );
          })}
        </div>

        {preview ? (
          <div className="reveal mx-auto mt-8 max-w-xl overflow-hidden rounded-4xl bg-gradient-to-br from-rose-500 via-rose-600 to-grape-500 p-[2px] shadow-lift">
            <div className="rounded-[calc(2rem-2px)] bg-white p-7">
              <p className="eyebrow">Kartu ucapan kamu</p>
              <p className="mt-4 font-display text-lg font-bold text-ink">Untuk {preview.to},</p>
              <p className="mt-3 whitespace-pre-line font-hand text-xl leading-snug text-ink/80">
                {preview.message}
              </p>
              <p className="mt-4 text-right font-display text-base font-bold text-rose-600">
                — {preview.from} 💖
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn-ghost" onClick={copyCard}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Tersalin!' : 'Salin Kartu'}
                </button>
                <button type="button" className="btn-ghost" onClick={() => setModalOpen(true)}>
                  Edit Kartu
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="reveal mt-10 text-center">
          <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
            <Mail className="h-4 w-4" />
            {preview ? 'Buat Kartu Ucapan Baru' : 'Buat Kartu Ucapan Sendiri'}
          </button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Kartu Ucapan Custom">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="card-to"
                className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-rose-500"
              >
                Untuk
              </label>
              <input
                id="card-to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                maxLength={30}
                placeholder="Nama pacarmu"
                className="w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="card-from"
                className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-rose-500"
              >
                Dari
              </label>
              <input
                id="card-from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                maxLength={30}
                placeholder="Namamu"
                className="w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="card-message"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-rose-500"
            >
              Pesannya
            </label>
            <textarea
              id="card-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              maxLength={500}
              placeholder="Tulis pesan paling jujur yang biasanya susah diucapkan langsung…"
              className="w-full resize-none rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={
              from.trim().length === 0 || to.trim().length === 0 || message.trim().length === 0
            }
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Jadikan Kartu ✨
          </button>
        </div>
      </Modal>
    </section>
  );
}
