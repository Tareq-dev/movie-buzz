let api_key = `&api_key=b438eb3479c6e4729b05c73cbe88e602`;
let base_url = "https://api.themoviedb.org/3";

export const popularMovieUrl =
  base_url + "/discover/movie?sort_by=popularity.desc" + api_key;
export const comediesMovieUrl =
  base_url +
  "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
  api_key;
