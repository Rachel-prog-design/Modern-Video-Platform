// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return; // prevent empty search
    // Navigate to SearchResults page with query as URL param
    navigate(`/search/${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
      <input
        type="text"
        placeholder="Search videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "4px 0 0 4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          border: "none",
          backgroundColor: "#FF0000",
          color: "white",
          borderRadius: "0 4px 4px 0",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;