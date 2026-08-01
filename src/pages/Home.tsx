import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Image, Mail, Sparkles } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import Hero from '@/components/Hero';

type HomeProps = {
  partnerName: string;
  onChangeName: (name: string) => void;
};

const journeys = [
  { to: '/alasan', icon: Heart, title: 'Alasan Aku Sayang', text: 'Buka alasan-alasan kecil yang bikin aku selalu memilih kamu.' },
  { to: '/kuis', icon: Sparkles, title: 'Kuis Romantis', text: 'Lima pertanyaan singkat untuk melihat seberapa kompak kita.' },
  { to: '/momen', icon: Image, title: 'Galeri Momen', text: 'Kumpulan kenangan dalam kartu polaroid yang manis.' },
  { to: '/surat', icon: Mail, title: 'Surat Untuk Kamu', text: 'Baca surat spesial dan buat kartu ucapan versimu sendiri.' },
];

export default function Home({ partnerName, onChangeName }: HomeProps) {
  return (
    <>
      <Hero partnerName={partnerName} onChangeName={onChangeName} />
      <section className="relative z-10 py-16 sm:py-24">
        <div className="shell">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pilih Perjalanan</p>
            <h2 className="mt-3 font-display text-3xl font-black text-ink sm:text-4xl">Satu Cerita, Banyak Halaman</h2>
            <p className="mt-3 text-sm text-ink/60">Setiap halaman punya kejutan dan interaksi berbeda. Mulai dari mana saja.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {journeys.map(({ to, icon: Icon, title, text }, index) => (
              <Link key={to} to={to} className="reveal group card-soft flex items-center gap-5 p-6 transition hover:-translate-y-1 hover:shadow-lift" style={{ transitionDelay: `${index * 60}ms` }}>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-500"><Icon className="h-6 w-6" /></span>
                <span className="flex-1"><strong className="font-display text-xl text-ink">{title}</strong><span className="mt-1 block text-sm text-ink/60">{text}</span></span>
                <ArrowRight className="h-5 w-5 text-rose-300 transition group-hover:translate-x-1 group-hover:text-rose-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA partnerName={partnerName} />
    </>
  );
}
