import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { ref, computed } from 'vue';
import type { Label } from '../interfaces/label';
import { useIssueStore } from '../../stores/issues';
import { storeToRefs } from 'pinia';

const getLabels = async (): Promise<Array<Label>> => {
  const { data } = await githubApi<Array<Label>>('/labels?per_page=100');

  return data;
};

export default function useLabels() {
  const issueStore = useIssueStore();
  const { labels: selectedLabels } = storeToRefs(issueStore);

  const { data: labels, isLoading } = useQuery(['Labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
  });

  return {
    labels,
    isLoading,
    toogleLabel: issueStore.toogleLabel,
    // selectedLabels: computed(() => selectedLabels),
    selectedLabels,
  };
}
