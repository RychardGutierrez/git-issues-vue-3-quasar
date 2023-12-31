import { Label } from './label';

export interface Issue {
  [x: string]: any;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Array<Label>;
  state: State;
  locked: boolean;
  assignee: null;
  assignees: Array<any>;
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: AuthorAssociation;
  active_lock_reason: null;
  draft?: boolean;
  pull_request?: PullRequest;
  body: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}

export enum AuthorAssociation {
  Collaborator = 'COLLABORATOR',
  None = 'NONE',
}

export enum Color {
  D4C5F9 = 'd4c5f9',
  E7E7E7 = 'e7e7e7',
  The9149D1 = '9149d1',
}

export enum Name {
  CLASigned = 'CLA Signed',
  ReactCoreTeam = 'React Core Team',
  StatusUnconfirmed = 'Status: Unconfirmed',
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: null;
}

export interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export enum State {
  All = '',
  Closed = 'closed',
  Open = 'open',
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: Type;
  site_admin: boolean;
}

export enum Type {
  User = 'User',
}

export interface Button {
  action: () => void;
  color?: string;
  icon?: string;
  size?: Size;
  id: string;
}

export enum Size {
  Xs = 'xs',
  Sm = 'sm',
}
