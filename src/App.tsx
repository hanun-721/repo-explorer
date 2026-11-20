import { useState } from "react";
import type { Repo } from "./types/github";
import { fetchRepos, GithubError } from "./services/github";
import SearchForm from "./components/search form.tsx";
import RepoCard from "./components/repocard.tsx";
import "./App.css";

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(username: string) {
    setLoading(true);
    setError("");
    setRepos([]);

    try {
      const data = await fetchRepos(username);
      setRepos(data);
    } catch (err) {
      if (err instanceof GithubError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>GitHub Repository Explorer</h1>
        <p>
          Discover and explore GitHub repositories by username.
        </p>
      </header>

      <SearchForm
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && (
        <p className="message">Loading repositories...</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && !error && repos.length > 0 && (
        <>
          <h2 className="results-title">
            Found {repos.length} repositories
          </h2>

          <section className="repo-grid">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </section>
        </>
      )}

      {!loading && !error && repos.length === 0 && (
        <p className="message">
          Search for a GitHub username to explore repositories.
        </p>
      )}

      <footer className="footer">
        Built with React, TypeScript and GitHub API
      </footer>
    </main>
  );
}

export default App;