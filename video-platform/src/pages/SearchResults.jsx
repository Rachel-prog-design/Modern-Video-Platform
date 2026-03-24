// src/pages/SearchResults.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

function SearchResults() {
  const { query } = useParams(); // get query from URL

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      fetchFromAPI(
        `search?part=snippet&q=${encodeURIComponent(query)}&maxResults=10&type=video`
      ),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  if (isLoading) return <Loader />;

  if (isError || !data || !data.items) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Unable to load search results</h2>
        {error?.status && <p>Status: {error.status}</p>}
        {error?.message && <p>Message: {error.message}</p>}
        <p>Please check your API key or try again later.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {data.items.map((video) => {
        if (!video.id?.videoId) return null;

        return <VideoCard key={video.id.videoId} video={video} />;
      })}
    </div>
  );
}

export default SearchResults;