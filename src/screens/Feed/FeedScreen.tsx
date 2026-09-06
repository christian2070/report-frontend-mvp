import { useFeedScreen, type FeedTab } from '@/screens/Feed/FeedScreen.hooks';
import { FeedScreenView } from '@/screens/Feed/FeedScreen.view';

interface FeedScreenProps {
  tab: FeedTab;
}

export function FeedScreen({ tab }: FeedScreenProps) {
  const feed = useFeedScreen({ tab });

  return <FeedScreenView {...feed} />;
}
