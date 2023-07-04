import { useIssueStore } from '../../stores/issues';
import { storeToRefs } from 'pinia';

export default function useStore() {
  const issuesStore = useIssueStore();
  const { labels, state } = storeToRefs(issuesStore);

  return { labels, state };
}
