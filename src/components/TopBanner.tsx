import { Download, Music, VolumeX } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/data/content';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';

type TopBannerProps = { musicOn: boolean; onToggleMusic: () => void };
const MARQUEE_TEXT = 'Selamat Hari Pacar Sedunia · World Girlfriend\u2019s Day · 1 Agustus · ';

export default function TopBanner({ musicOn, onToggleMusic }: TopBannerProps) {
  const { canInstall, install } = useInstallPrompt();

  return (
    <header className="relative z-30">
      <div className="overflow-hidden border-b border-rose-100 bg-rose-100/70 py-2 backdrop-blur">
        <div className="anim-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((key) => (
            <span key={key} className="flex">
              {Array.from({ length: 6 }, (_, index) => <span key={index} className="px-4 text-[11px] font-bold uppercase tracking-[0.3em] text-rose-700">{MARQUEE_TEXT}</span>)}
            </span>
          ))}
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-rose-700">
          <span className="anim-heartbeat text-xl">💖</span><span>Untuk Kamu</span>
        </Link>

        <nav className="order-3 flex w-full items-center justify-center gap-1 overflow-x-auto md:order-none md:w-auto">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) => `shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${isActive ? 'bg-white text-rose-700 shadow-soft' : 'text-rose-700/70 hover:bg-white/70 hover:text-rose-700'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {canInstall ? (
            <button type="button" onClick={install} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-grape-500 px-4 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Pasang App</span>
            </button>
          ) : null}

          <button type="button" onClick={onToggleMusic} aria-pressed={musicOn} className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-xs font-bold text-rose-700 transition hover:border-rose-400 hover:bg-white">
            {musicOn ? <Music className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden sm:inline">{musicOn ? 'Nada Cinta: ON' : 'Nada Cinta: OFF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
