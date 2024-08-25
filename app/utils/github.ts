import { Commit, GithubUser } from "../api/github.types";
import Board from "../components/board";

export const commitListInfo = (commitList: Commit[], userInfo: GithubUser): Board => {
  const commitMessages = commitList.map(commit => commit.message);

  return {
    name: userInfo.display_login,
    avatarUrl: userInfo.avatar_url,
    url: `https://github.com/${userInfo.display_login}`,
    commitMessages,
    pushCount: commitMessages.length,
  }
}