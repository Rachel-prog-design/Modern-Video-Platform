import { Link } from "react-router-dom";

function VideoCard({ video }) {
  const { snippet } = video;

  return (
    <div className="video-card">
      <Link to={`/video/${video.id.videoId}`}>
        <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
      </Link>

      <h3>{snippet.title}</h3>
      <p>{snippet.channelTitle}</p>
    </div>
  );
}

export default VideoCard;