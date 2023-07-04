import { githubApi } from 'src/api/githubApi';
import { Issue } from '../interfaces/issues';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';

interface Options {
  autoload?: boolean;
}

const getIssue = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Array<Issue>> => {
  const { data } = await githubApi.get<Array<Issue>>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};

export default function useIssue(issueNumber: number, options?: Options) {
  const queryClient = useQueryClient();

  const { autoload = true } = options || {};

  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    {
      staleTime: 1000 * 60,
      enabled: autoload,
    }
  );

  const issueQueryComments = useQuery(
    ['comments', issueNumber],
    () => getIssueComments(issueNumber),

    // () => getIssueComments(issueQuery.data.value?.number || 0),
    // { enabled: computed(() => Boolean(issueQuery.data.value)) }
    { enabled: autoload }
  );

  const preFechQuery = (issueNumber: number) => {
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      {
        staleTime: 1000 * 60,
      }
    );

    queryClient.prefetchQuery(
      ['comments', issueNumber],

      () => getIssueComments(issueNumber),
      { staleTime: 1000 * 15 }
    );
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return { issueQuery, issueQueryComments, preFechQuery, setIssueCacheData };
}
