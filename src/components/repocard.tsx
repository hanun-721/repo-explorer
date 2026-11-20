import type { Repo } from "../types/github";

interface RepoCardProps {
  repo: Repo;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="repo-card">
      <div className="repo-header">
        <h3>{repo.name}</h3>

        {repo.fork && (
          <span className="fork-badge">Fork</span>
        )}
      </div>

      <p className="repo-description">
        {repo.description || "No description available."}
      </p>

      <div className="repo-details">
        <span>
          ⭐ {repo.stargazers_count}
        </span>

        <span>
          💻 {repo.language || "Unknown"}
        </span>
      </div>

      <p className="repo-updated">
        Updated: {new Date(repo.updated_at).toLocaleDateString()}
      </p>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="repo-link"
      >
        View Repository →
      </a>
    </div>
  );
}

export default RepoCard;