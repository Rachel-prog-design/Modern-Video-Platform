import ReactPlayer from "react-player";

function VideoPlayer({ videoId }) {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${videoId}`}
      controls
      width="100%"
    />
  );
}

export default VideoPlayer;