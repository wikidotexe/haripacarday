import { useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { fireConfetti } from '@/lib/confetti';
import { QUIZ, QUIZ_MAX_SCORE, QUIZ_RESULTS } from '@/data/content';

type QuizProps = {
  bestScore: number;
  onFinish: (score: number) => void;
};

export default function Quiz({ bestScore, onFinish }: QuizProps) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const question = QUIZ[step];
  const progress = done ? 100 : (step / QUIZ.length) * 100;

  const choose = (optionIndex: number) => {
    if (picked !== null) return;
    setPicked(optionIndex);

    const gained = question.options[optionIndex].score;
    const nextScore = score + gained;

    window.setTimeout(() => {
      setPicked(null);
      if (step + 1 < QUIZ.length) {
        setScore(nextScore);
        setStep(step + 1);
      } else {
        setScore(nextScore);
        setDone(true);
        onFinish(nextScore);
        fireConfetti({ count: 110 });
      }
    }, 420);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  const result = QUIZ_RESULTS.find((r) => score >= r.min) ?? QUIZ_RESULTS[QUIZ_RESULTS.length - 1];

  return (
    <section id="kuis" className="relative z-10 py-16 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Main Yuk"
          title="Seberapa Romantis & Kenal Kamu Sama Kita?"
          subtitle="Lima pertanyaan singkat, jawab jujur ya. Nggak ada jawaban salah — cuma ada jawaban paling kamu."
        />

        <div className="reveal relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-5xl border border-rose-100 bg-white/90 p-7 shadow-lift sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-rose-200/60 to-grape-400/30 blur-2xl" />

          {!done ? (
            <div className="relative">
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.16em] text-rose-400">
                <span>
                  Pertanyaan {step + 1} dari {QUIZ.length}
                </span>
                <span>Skor {score} ✨</span>
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-rose-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-grape-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h3 className="mt-7 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                {question.question}
              </h3>

              <div className="mt-6 space-y-3">
                {question.options.map((option, i) => {
                  const isPicked = picked === i;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => choose(i)}
                      className={`w-full rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-300 ${
                        isPicked
                          ? 'border-rose-400 bg-gradient-to-r from-rose-500 to-grape-500 text-white shadow-glow'
                          : 'border-rose-100 bg-rose-50/40 text-ink/80 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-white hover:shadow-soft'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="anim-pop relative text-center">
              <div className="text-5xl">{result.emoji}</div>
              <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-rose-500">
                Hasil kamu
              </p>
              <h3 className="mt-2 font-display text-2xl font-black text-ink sm:text-3xl">
                {result.title}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/65">
                {result.desc}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-50 px-5 py-2.5 text-sm font-bold text-rose-600">
                <Sparkles className="h-4 w-4" />
                Skor {score} / {QUIZ_MAX_SCORE}
                {bestScore > 0 ? (
                  <span className="text-rose-400">· terbaik {bestScore}</span>
                ) : null}
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button type="button" className="btn-primary" onClick={restart}>
                  <RotateCcw className="h-4 w-4" />
                  Ulangi Kuis
                </button>
                <Link to="/momen" className="btn-ghost">
                  Lanjut Lihat Momen →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
