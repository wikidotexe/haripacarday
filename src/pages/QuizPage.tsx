import Quiz from '@/components/Quiz';

type Props = { bestScore: number; onFinish: (score: number) => void };

export default function QuizPage(props: Props) {
  return <Quiz {...props} />;
}
