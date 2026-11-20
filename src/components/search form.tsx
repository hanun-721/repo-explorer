import { useState } from "react";

interface SearchFormProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [username, setUsername] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;

    onSearch(trimmedUsername);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit" disabled={loading || !username.trim()}>
        {loading ? "Searching..." : "Search Repositories"}
      </button>
    </form>
  );
}

export default SearchForm;