import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import VideoCardDetails from "./pages/VideoCardDetails";
import ChannelDetails from "./pages/ChannelDetails";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoCardDetails />} />
        <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;