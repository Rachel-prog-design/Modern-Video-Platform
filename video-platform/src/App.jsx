// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import VideoCardDetails from "./pages/VideoCardDetails";
import ChannelDetails from "./pages/ChannelDetails";
import SearchResults from "./pages/SearchResults";
import SearchBar from "./components/Searchbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Search bar visible on all pages */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1000,
          padding: "10px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <SearchBar />
      </div>

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