import React, { useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import Footer from "./components/Footer";
import Search from "./pages/Search";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchTextResult, setSearchTextResult] = useState("");
  const [movieType, setMovieType] = useState(0);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const handleType = (e) => {
    const getType = e.target.value;
    setMovieType(getType);
  };

  return (
    <div className="container mx-auto text-[#d4d4dc] px-4 md:px-4">
      <Navbar
        setSearchTextResult={setSearchTextResult}
        setSearchText={setSearchText}
        handleType={handleType}
        movieType={movieType}
        setContent={setContent}
        setError2={setError2}
        setError={setError}
        navigate={navigate}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-series" element={<TVSeries />} />
        <Route
          path="/search"
          element={
            <Search
              content={content}
              error={error}
              error2={error2}
              searchText={searchText}
              searchTextResult={searchTextResult}
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
