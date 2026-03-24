// src/pages/Feed.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

function Feed() {
  const [category, setCategory] = useState("Coding");

  const {
    data,
    isLoading,
    isError,
    error, // this will include status and message from fetchFromAPI
  } = useQuery({
    queryKey: ["videos", category],
    queryFn: () =>
      fetchFromAPI(
        `search?part=snippet&q=${category}&maxResults=10&type=video` // smaller number to avoid 429
      ),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  if (isLoading) return <Loader />;

  if (isError || !data || !data.items) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Unable to load videos</h2>
        {error?.status && <p>Status: {error.status}</p>}
        {error?.message && <p>Message: {error.message}</p>}
        <p>Please check your internet connection or try again later.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Category Menu */}
      <Sidebar selectedCategory={category} setSelectedCategory={setCategory} />

      {/* Video Grid */}
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
    </div>
  );
}

export default Feed;