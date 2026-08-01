import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from './Modal';
import ReasonCard from './ReasonCard';
import SectionHeading from './SectionHeading';
import { REASONS, type Reason } from '@/data/content';

const EMOJI_CHOICES = ['💗', '🌸', '💜', '✨', '🍜', '🏡', '☕', '🎧'];

type ReasonsProps = {
  customReasons: Reason[];
  onAdd: (reason: Reason) => void;
  onRemove: (id: string) => void;
  partnerName: string;
};

export default function Reasons({ customReasons, onAdd, onRemove, partnerName }: ReasonsProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [emoji, setEmoji] = useState(EMOJI_CHOICES[0]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const all = [...REASONS, ...customReasons];

  const submit = () => {
    const cleanTitle = title.trim();
    const cleanBody = body.trim();
    if (cleanTitle.length === 0 || cleanBody.length === 0) return;

    onAdd({
      id: `custom-${Date.now()}`,
      emoji,
      title: cleanTitle.slice(0, 40),
      teaser: cleanBody.slice(0, 90) + (cleanBody.length > 90 ? '…' : ''),
      body: cleanBody,
    });

    setTitle('');
    setBody('');
    setEmoji(EMOJI_CHOICES[0]);
    setModalOpen(false);
  };

  return (
    <section id="alasan" className="relative z-10 py-16 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Love List Interaktif"
          title={`Kenapa Aku Sayang Sama ${partnerName.split(' ')[0]}?`}
          subtitle="Klik kartu di bawah ini untuk membaca alasan lengkapnya. Kamu juga bisa menambahkan versimu sendiri."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((reason, i) => (
            <ReasonCard
              key={reason.id}
              reason={reason}
              index={i}
              open={openId === reason.id}
              onToggle={() => setOpenId((prev) => (prev === reason.id ? null : reason.id))}
              onRemove={reason.id.startsWith('custom-') ? () => onRemove(reason.id) : undefined}
            />
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Alasan Versi Kamu
          </button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Alasan Sayang">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-rose-500">
              Pilih ikon
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_CHOICES.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setEmoji(choice)}
                  aria-pressed={emoji === choice}
                  className={`grid h-11 w-11 place-items-center rounded-2xl border text-lg transition ${
                    emoji === choice
                      ? 'border-rose-400 bg-rose-50 shadow-glow'
                      : 'border-rose-100 bg-white hover:border-rose-300'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="reason-title"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-rose-500"
            >
              Judul alasan
            </label>
            <input
              id="reason-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={40}
              placeholder="Contoh: Suara Nyanyi Kamu"
              className="w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="reason-body"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-rose-500"
            >
              Ceritanya
            </label>
            <textarea
              id="reason-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={400}
              placeholder="Tulis kenapa hal ini bikin kamu jatuh hati…"
              className="w-full resize-none rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={title.trim().length === 0 || body.trim().length === 0}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Simpan Alasan 💖
          </button>
          <p className="text-center text-[11px] text-ink/45">
            Alasan tersimpan otomatis di browser ini.
          </p>
        </div>
      </Modal>
    </section>
  );
}
