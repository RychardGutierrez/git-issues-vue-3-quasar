import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issues';
import { githubApi } from 'src/api/githubApi';

interface ArgsIssue {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  labels = [],
  body = '',
}: ArgsIssue): Promise<Issue> => {
  const newIssue = { title, labels, body };
  console.log(newIssue, 'newIssue');
  const { data } = await githubApi.post<Issue>('/issues', newIssue);
  console.log(data);
  return data;
};

export default function useIssueMutation() {
  const queryClient = useQueryClient();
  const issueMutation = useMutation(addIssue, {
    onSuccess(issue) {
      queryClient.invalidateQueries({ queryKey: ['issues'], exact: false });

      queryClient.refetchQueries(['issues'], { exact: false });

      queryClient.setQueryData(['issue', issue.number], issue);
    },
    onSettled() {
      console.log('settled');
    },
  });
  return { issueMutation };
}
