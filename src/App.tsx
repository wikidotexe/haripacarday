import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import FloatingHearts from '@/components/FloatingHearts';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import { useAmbientMusic } from '@/hooks/useAmbientMusic';
import { useLocalState } from '@/hooks/useLocalState';
import { useReveal } from '@/hooks/useReveal';
import type { Reason } from '@/data/content';
import type { GreetingCard } from '@/components/Letters';
import Home from '@/pages/Home';
import ReasonsPage from '@/pages/ReasonsPage';
import QuizPage from '@/pages/QuizPage';
import MomentsPage from '@/pages/MomentsPage';
import LettersPage from '@/pages/LettersPage';

function AppContent() {
  const location = useLocation();
  const [partnerName, setPartnerName] = useLocalState('haripacar:name', 'Pacar Terhebat Sedunia');
  const [customReasons, setCustomReasons] = useLocalState<Reason[]>('haripacar:reasons', []);
  const [bestScore, setBestScore] = useLocalState('haripacar:best', 0);
  const [card, setCard] = useLocalState<GreetingCard | null>('haripacar:card', null);
  const [showTop, setShowTop] = useState(false);
  const { playing, toggle } = useAmbientMusic();

  useReveal(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col">
      <FloatingHearts />
      <TopBanner musicOn={playing} onToggleMusic={toggle} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home partnerName={partnerName} onChangeName={setPartnerName} />} />
          <Route
            path="/alasan"
            element={
              <ReasonsPage
                partnerName={partnerName}
                customReasons={customReasons}
                onAdd={(reason) => setCustomReasons((prev) => [...prev, reason])}
                onRemove={(id) => setCustomReasons((prev) => prev.filter((reason) => reason.id !== id))}
              />
            }
          />
          <Route
            path="/kuis"
            element={
              <QuizPage
                bestScore={bestScore}
                onFinish={(score) => setBestScore((prev) => Math.max(prev, score))}
              />
            }
          />
          <Route path="/momen" element={<MomentsPage />} />
          <Route path="/surat" element={<LettersPage card={card} onSaveCard={setCard} />} />
          <Route path="*" element={<Home partnerName={partnerName} onChangeName={setPartnerName} />} />
        </Routes>
      </main>
      <Footer />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-grape-500 text-white shadow-glow transition-all duration-300 ${showTop ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
