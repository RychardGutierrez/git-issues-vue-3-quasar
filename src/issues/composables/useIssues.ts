import { useQuery } from '@tanstack/vue-query';
import type { Issue, State } from '../interfaces/issues';
import { githubApi } from 'src/api/githubApi';
import useStore from './useStore';

const getIssues = async (
  labels: Array<string>,
  state: State
): Promise<Array<Issue>> => {
  const params = new URLSearchParams();

  params.append('per_page', '10');

  if (state) {
    params.append('state', state);
  }

  if (Boolean(labels.length)) {
    params.append('labels', labels.join(','));
  }

  const { data } = await githubApi.get<Array<Issue>>('/issues', {
    params,
  });

  return data;
};

export default function useIssues() {
  const { labels, state } = useStore();

  const issuesQuery = useQuery(['issues', { labels, state }], () =>
    getIssues(labels.value, state.value)
  );

  return { issuesQuery };
}
