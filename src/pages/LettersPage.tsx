import Letters, { type GreetingCard } from '@/components/Letters';

type Props = { card: GreetingCard | null; onSaveCard: (card: GreetingCard) => void };

export default function LettersPage(props: Props) {
  return <Letters {...props} />;
}
