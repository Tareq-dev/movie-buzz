import React from "react";
import MovieCard from "../components/MovieCard";
import { ImWarning } from "react-icons/im";

function Search({ content, error, error2, searchTextResult }) {
  return (
    <div className="min-h-screen pb-14">
      <div>
        {searchTextResult && (
          <p className="text-xl md:text-3xl font-bold text-[#d4d4dc] py-8 ml-1">
            Search Result For - "{searchTextResult}"
          </p>
        )}
        {content.length === 0 ? (
          <p className="text-red-400 px-4 w-full my-20 flex justify-center items-center md:text-xl">
            {error2}
          </p>
        ) : (
          ""
        )}
        {error ? (
          <p className="text-red-400 px-4 w-full my-20 flex justify-center items-center md:text-xl">
            <ImWarning size={30} className="mx-4" /> {error}
          </p>
        ) : (
          <div className="grid md:grid-cols-6 grid-cols-2 gap-3 md:gap-5  mx-2">
            {content.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
