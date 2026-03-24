// src/pages/VideoCardDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";

function VideoCardDetails() {
  const { id } = useParams(); // videoId

  // Fetch video details
  const {
    data: videoData,
    isLoading: videoLoading,
    isError: videoError,
    error: videoErrorObj,
  } = useQuery({
    queryKey: ["video", id],
    queryFn: () =>
      fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch related videos
  const {
    data: relatedData,
    isLoading: relatedLoading,
    isError: relatedError,
  } = useQuery({
    queryKey: ["related", id],
    queryFn: () =>
      fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10`
      ),
    staleTime: 1000 * 60 * 5,
  });

  if (videoLoading || relatedLoading) return <Loader />;

  if (videoError || !videoData || !videoData.items) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Unable to load video</h2>
        {videoErrorObj?.status && <p>Status: {videoErrorObj.status}</p>}
        {videoErrorObj?.message && <p>Message: {videoErrorObj.message}</p>}
      </div>
    );
  }

  const video = videoData.items[0];
  const { snippet, statistics } = video;

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Main Video Player */}
      <div style={{ flex: 2 }}>
        <div style={{ position: "relative", paddingTop: "56.25%" /* 16:9 */ }}>
          <iframe
            title={snippet.title}
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>

        <h2 style={{ marginTop: "15px" }}>{snippet.title}</h2>
        <p>
          {statistics.viewCount} views • {new Date(snippet.publishedAt).toDateString()}
        </p>
        <p style={{ marginTop: "10px" }}>{snippet.description}</p>

        <Link to={`/channel/${snippet.channelId}`} style={{ color: "blue" }}>
          Go to channel: {snippet.channelTitle}
        </Link>
      </div>

      {/* Related Videos */}
      <div style={{ flex: 1 }}>
        <h3>Related Videos</h3>
        {relatedData?.items.map((vid) => {
          if (!vid.id?.videoId) return null;
          return <VideoCard key={vid.id.videoId} video={vid} />;
        })}
      </div>
    </div>
  );
}

export default VideoCardDetails;