import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";


function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["videos", selectedCategory],
    queryFn: () =>
      fetchFromAPI(
        `search?part=snippet&q=${selectedCategory}&type=video&maxResults=20`
      ),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading videos</p>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="videos">
        {data.items.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Feed;