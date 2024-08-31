/** 푸시 내역 조회 payload */
interface PushListPayload {
  username: string;
  date: Date;
  maxLength?: number;
}

/** 푸시 내역 user info */
interface Actor {
  id: number;
  avatar_url: string;
  gravatar_id: string;
  display_login: string;
  login: string;
  url: string;
}

/** 푸시 내역 commit info */
interface Commit {
  author: {
    email: string;
    name: string;
  }
  distinct: boolean;
  message: string;
  sha: string;
  url: string;
}

/** 푸시 내역 response */
interface PushListResponse {
  actor: Actor;
  created_at: string;
  id: string;
  payload: {
    before: string;
    commits: Commit[];
    distinct_size: number;
    head: string;
    push_id: number;
    ref: string;
    repository_id: number;
    size: number;
  }
  public: boolean;
  repo: {
    id: number;
    name: string;
    url: string;
  },
  type: 'PushEvent';
}

export type {
  Commit,
  Actor as GithubUser,
  PushListPayload,
  PushListResponse,
}