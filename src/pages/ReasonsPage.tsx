import Reasons from '@/components/Reasons';
import type { Reason } from '@/data/content';

type Props = { partnerName: string; customReasons: Reason[]; onAdd: (reason: Reason) => void; onRemove: (id: string) => void };

export default function ReasonsPage(props: Props) {
  return <Reasons {...props} />;
}
