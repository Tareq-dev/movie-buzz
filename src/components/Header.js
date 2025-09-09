import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { BsPlayCircle } from "react-icons/bs";
import apiConfig from "./../utilities/apiConfig";

function Header() {
  const [upcomingMovies, setUpComingMovies] = useState([]);
  const [video, setVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const upComing = `${apiConfig.baseUrl}/movie/upcoming?api_key=${apiConfig.apiKey}&language=en-US&page=1`;
  useEffect(() => {
    fetch(upComing)
      .then((res) => res.json())
      .then((data) => {
        setUpComingMovies(data?.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, [upComing]);

  const prevSlide = () => {
    if (upcomingMovies.length === 0) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? upcomingMovies.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    if (upcomingMovies.length === 0) return;
    const isLastSlide = currentIndex === upcomingMovies.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    window.scroll(0, 0);
  };

  // fetch video for current movie
  useEffect(() => {
    if (upcomingMovies[currentIndex]?.id) {
      fetch(
        `${apiConfig.baseUrl}/movie/${upcomingMovies[currentIndex].id}/videos?api_key=${apiConfig.apiKey}&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => setVideo(data?.results?.[0]?.key || null))
        .catch((err) => console.error("Error fetching video:", err));
    }
  }, [currentIndex, upcomingMovies]);

  if (loading) {
    return (
      <div className="text-center text-white py-20 text-xl">
        Loading upcoming movies...
      </div>
    );
  }
  if (!upcomingMovies || upcomingMovies.length === 0) {
    return (
      <div className="text-center text-red-500 py-20 text-xl">
        No upcoming movies found.
      </div>
    );
  }

  const movie = upcomingMovies[currentIndex];

  return (
    <div className="max-w-[1400px] h-[650px] w-full m-auto py-4 relative group hidden md:block pb-14">
     <div
  style={{
    backgroundImage: movie?.backdrop_path
      ? `url(${apiConfig.originalImage}${movie.backdrop_path})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative flex justify-center items-center bg-[#2b2b2c]"
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 rounded-2xl "></div>

  {/* Content */}
  <div className="md:flex md:justify-between items-center w-full h-full relative  ">
    {/* Text content */}
    <div className="ml-20 md:w-1/2">
      <h1 className="text-4xl font-extrabold text-[#feda6a] pb-2 font-patua">
        {movie?.title}
      </h1>
      <p className="text-sm font-extrabold text-white text-justify pr-28">
        Release Date : {movie?.release_date}
      </p>
      <p className="text-sm font-extrabold text-white text-justify pr-28">
        Popularity : {movie?.popularity}
      </p>
      <p className="text-md font-extrabold text-white text-justify pb-8 py-4 pr-28">
        {movie?.overview}
      </p>

      {video && (
        <a
          target="__blank"
          href={`https://www.youtube.com/watch?v=${video}`}
          className="bg-[#AD0000] text-white font-semibold px-4 py-3 text-lg rounded-md flex justify-center items-center w-60"
        >
          <BsPlayCircle className="mr-2" size={24} /> Watch the trailer
        </a>
      )}
    </div>

    {/* Poster */}
    <div className="mr-36 shadow-[#feda6a] shadow-2xl">
      <div className="relative my-1">
        {movie?.poster_path && (
          <img
            src={`${apiConfig.imgW500}${movie.poster_path}`}
            alt={movie?.title || "Movie Poster"}
            className="rounded-lg h-[500px] w-[380px] object-cover"
          />
        )}
        <p className="bg-[#feda6a] rounded-md px-2 py-1 text-center absolute top-2 text-sm flex items-center font-semibold text-black">
          <FaStar className="inline mx-2" size={18} /> {movie?.vote_average}
        </p>
      </div>
    </div>
  </div>
</div>


      {/* ----------custom carousel-------------- */}
      <div>
        {/* Left Arrow */}
        <div
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={prevSlide}
        >
          <BsChevronCompactLeft size={30} />
        </div>
        {/* Right Arrow */}
        <div
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={nextSlide}
        >
          <BsChevronCompactRight size={30} />
        </div>
        {/* Dots */}
        <div className="flex top-4 justify-center py-2">
          {upcomingMovies?.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? "text-yellow-400" : "text-white"
                }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
