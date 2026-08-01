import { useCountdown } from '@/hooks/useCountdown';

const UNITS = [
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
] as const;

export default function Countdown() {
  const time = useCountdown();

  return (
    <div className="card-soft mx-auto w-full max-w-md px-6 py-6">
      <p className="mb-4 text-center text-[11px] font-extrabold uppercase tracking-[0.22em] text-rose-500">
        {time.isToday ? '🎉 Hari ini Hari Pacar Sedunia!' : '⏳ Hitung mundur Hari Pacar Sedunia'}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="rounded-2xl bg-gradient-to-b from-rose-50 to-white px-2 py-4 text-center ring-1 ring-rose-100"
          >
            <div className="font-display text-3xl font-black tabular-nums text-rose-600 sm:text-4xl">
              {String(time[unit.key]).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-400">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
