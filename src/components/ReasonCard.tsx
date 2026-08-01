import { ChevronDown, Trash2 } from 'lucide-react';
import type { Reason } from '@/data/content';

type ReasonCardProps = {
  reason: Reason;
  index: number;
  open: boolean;
  onToggle: () => void;
  onRemove?: () => void;
};

export default function ReasonCard({ reason, index, open, onToggle, onRemove }: ReasonCardProps) {
  return (
    <article
      className="reveal group relative flex flex-col rounded-4xl border border-rose-100 bg-white/90 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-200 hover:shadow-lift"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-xl transition group-hover:animate-none group-hover:[animation:heartbeat_1.4s_ease-in-out_infinite]">
          {reason.emoji}
        </span>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Hapus alasan ${reason.title}`}
            className="rounded-full p-2 text-rose-300 opacity-0 transition hover:bg-rose-50 hover:text-rose-500 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <h3 className="font-display text-lg font-bold text-ink">{reason.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{reason.teaser}</p>

      <div
        className="grid transition-all duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="mt-4 border-t border-dashed border-rose-100 pt-4 text-sm leading-relaxed text-ink/75">
            {reason.body}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-extrabold uppercase tracking-[0.14em] text-rose-500 transition hover:text-rose-600"
      >
        {open ? 'Tutup lagi' : 'Baca alasan ini'}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
    </article>
  );
}
