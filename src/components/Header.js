import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { BsPlayCircle } from "react-icons/bs";
import apiConfig from './../utilities/apiConfig';

function Header() {
  const [upcomingMovies, setUpComingMovies] = useState([]);
  const [video, setVideo] = useState();
  const upComing = `${apiConfig.baseUrl}/movie/upcoming?api_key=${apiConfig.apiKey}&language=en-US&page=1`;
  useEffect(() => {
    fetch(upComing)
      .then((res) => res.json())
      .then((data) => setUpComingMovies(data?.results));
  }, [upComing]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? upcomingMovies?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === upcomingMovies?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    window.scroll(0, 0);
  };
  useEffect(() => {
   if(upcomingMovies[currentIndex]?.id){
    fetch(
      `${apiConfig.baseUrl}/movie/${upcomingMovies[currentIndex]?.id}/videos?api_key=${apiConfig.apiKey}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideo(data?.results[0]?.key));
   }
  }, [currentIndex, upcomingMovies]);
  return (
    <div className="max-w-[1400px] h-[650px] w-full m-auto py-4 relative group hidden md:block pb-14">
      <div className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative flex justify-center items-center bg-[#2b2b2c]">
        <div className="md:flex md:justify-between items-center w-full h-full">
          <div className="ml-20 md:w-1/2">
            <h1 className="text-4xl font-extrabold text-[#feda6a] pb-2 font-patua">
              {upcomingMovies[currentIndex]?.title}
            </h1>
            <p className="text-sm font-extrabold text-[#d4d4dc] text-justify  pr-28">
              Release Date : {upcomingMovies[currentIndex]?.release_date}
            </p>
            <p className="text-sm font-extrabold text-[#d4d4dc] text-justify  pr-28">
              Popularity : {upcomingMovies[currentIndex]?.popularity}
            </p>
            <p className="text-md font-extrabold text-[#d4d4dc] text-justify pb-8 py-4 pr-28">
              {upcomingMovies[currentIndex]?.overview}
            </p>
            <a
              target="__blank"
              href={`https://www.youtube.com/watch?v=${video}`}
              className="bg-[#AD0000] text-white font-semibold px-4 py-3 text-lg rounded-md flex justify-center items-center w-60"
              type=""
            >
              <BsPlayCircle className="mr-2" size={24} /> Watch the trailer
            </a>
          </div>
          <div className="mr-36 shadow-[#feda6a] shadow-2xl">
            <div className="relative my-1 ">
             {upcomingMovies[currentIndex] && <img
                src={`${apiConfig.imgW500}${upcomingMovies[currentIndex]?.poster_path}`}
                alt=""
                className="rounded-lg h-[500px] w-[380px] object-cover"
              />}
              <p className="bg-[#feda6a] rounded-md px-2 py-1 text-center absolute top-2 text-sm flex items-center font-semibold text-black">
                <FaStar className="inline mx-2" size={18} />{" "}
                {upcomingMovies[currentIndex]?.vote_average}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ----------custom carousel-------------- */}
      <div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {upcomingMovies?.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
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
