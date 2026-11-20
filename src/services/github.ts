import type { Repo } from "../types/github";

export class GithubError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "GithubError";
  }
}

export async function fetchRepos(
  username: string,
  signal?: AbortSignal
): Promise<Repo[]> {
  const response = await fetch(
     `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      signal,
    }
  );

  if (!response.ok) {
    throw new GithubError(
      response.status === 404
        ? "GitHub user not found!"
        : "Failed to fetch repositories.",
      response.status
    );
  }

  return (await response.json()) as Repo[];
}