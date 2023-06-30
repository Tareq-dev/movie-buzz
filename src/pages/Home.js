import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  popularMovieUrl,
  comediesMovieUrl,
  theatresMovieUrl,
  kidsMovieUrl,
  dramaMovieUrl,
} from "../utilities/config";
import { Link } from "react-router-dom";
AOS.init();

function Home() {
  const [popularMovie, setPopularMovie] = useState([]);
  const [comedieMovie, setComedieMovie] = useState([]);
  const [theatresMovie, setTheatresMovie] = useState([]);
  const [kidsMovie, setKidsMovie] = useState([]);
  const [dramaMovie, setDramaMovie] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(popularMovieUrl).then((res1) => res1.json()),
      fetch(comediesMovieUrl).then((res2) => res2.json()),
      fetch(theatresMovieUrl).then((res3) => res3.json()),
      fetch(kidsMovieUrl).then((res4) => res4.json()),
      fetch(dramaMovieUrl).then((res5) => res5.json()),
    ])
      .then(([result1, result2, result3, result4, result5]) => {
        if (result1.results) {
          setPopularMovie(result1.results);
        }
        if (result2.results) {
          setComedieMovie(result2.results);
        }
        if (result3.results) {
          setTheatresMovie(result3.results);
        }
        if (result4.results) {
          setKidsMovie(result4.results);
        }
        if (result5.results) {
          setDramaMovie(result5.results);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="pb-20 pt-4">
      <Header />
      <div data-aos="zoom-in" data-aos-duration="3000">
        <p className="text-xl md:text-3xl font-bold text-[#d4d4dc] py-4 ml-1 font-patua">
          Most Popular Movies
        </p>
        <div className="grid md:grid-cols-6 grid-cols-2 gap-3 md:gap-5  mx-2">
          {popularMovie.slice(0, 12).map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <div className="flex justify-end py-6">
          <Link to="/movies"
            className="mr-4 font-bold text-xl border-b-2 border-b-[#feda6a] "
            type=""
          >
            View More...
          </Link>
        </div>
      </div>
      <div data-aos="zoom-in" data-aos-duration="3000">
        <p className="text-xl md:text-3xl font-bold text-[#d4d4dc] py-4 ml-1 font-patua">
          Most Comedie Movies
        </p>
        <div className="grid md:grid-cols-6 grid-cols-2 gap-3 md:gap-5  mx-2">
          {comedieMovie.slice(0, 12).map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <div className="flex justify-end py-6">
          <Link
            to="/movies"
            className="mr-4 font-bold text-xl border-b-2 border-b-[#feda6a] "
            type=""
          >
            View More...
          </Link>
        </div>
      </div>
      <div data-aos="zoom-in" data-aos-duration="3000">
        <p className="text-xl md:text-3xl font-bold text-[#d4d4dc] py-4 ml-1 font-patua">
          Most Theatres Movies
        </p>
        <div className="grid md:grid-cols-6 grid-cols-2 gap-3 md:gap-5  mx-2">
          {theatresMovie.length === 0 ? (
            <p>Not Found</p>
          ) : (
            theatresMovie
              .slice(0, 12)
              .map((movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>
        <div className="flex justify-end py-6">
          <Link
            to="/movies"
            className="mr-4 font-bold text-xl border-b-2 border-b-[#feda6a] "
            type=""
          >
            View More...
          </Link>
        </div>
      </div>
      <div data-aos="zoom-in" data-aos-duration="3000">
        <p className="text-xl md:text-3xl font-bold text-[#d4d4dc] py-4 ml-1 font-patua">
          Most Kids Movies
        </p>
        <div className="grid md:grid-cols-6 grid-cols-2 gap-3 md:gap-5  mx-2">
          {kidsMovie.length === 0 ? (
            <p>Not Found</p>
          ) : (
            kidsMovie
              .slice(0, 12)
              .map((movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>
        <div className="flex justify-end py-6">
          <Link
            to="/movies"
            className="mr-4 font-bold text-xl border-b-2 border-b-[#feda6a] "
            type=""
          >
            View More...
          </Link>
        </div>
      </div>
      <div data-aos="zoom-in" data-aos-duration="3000">
        <p className="text-xl md:text-3xl font-bold text-[#d4d4dc] py-4 ml-1 font-patua">
          Most Drama Movies
        </p>
        <div className="grid md:grid-cols-6 grid-cols-2 gap-3 md:gap-5  mx-2">
          {dramaMovie.length === 0 ? (
            <p>Not Found</p>
          ) : (
            dramaMovie
              .slice(0, 12)
              .map((movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>
        <div className="flex justify-end py-6">
          <Link
            to="/movies"
            className="mr-4 font-bold text-xl border-b-2 border-b-[#feda6a] "
            type=""
          >
            View More...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
