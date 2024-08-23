import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { username, repo, date } = req.query;

  if (!username || !repo || !date) {
    return res.status(400).json({ error: 'Page not found' });
  }

  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const url = `https://api.github.com/repos/${username}/${repo}/commits?since=${date}T00:00:00Z&until=${date}T23:59:59Z`;

  try {
    const response = await fetch(url, { headers });
    const data: Commit[] = await response.json();

    if (!response.ok) return res.status(response.status).json({ error: data });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error to fetch' });
  }
}

export default handler;
export type { Commit }