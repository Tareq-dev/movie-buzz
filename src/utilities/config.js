let api_key = `&api_key=b438eb3479c6e4729b05c73cbe88e602`;
let base_url = "https://api.themoviedb.org/3";

export const popularMovieUrl =
  base_url + "/discover/movie?sort_by=popularity.desc" + api_key;
export const comediesMovieUrl =
  base_url +
  "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
  api_key;
export const theatresMovieUrl =
  base_url +
  "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
  api_key;
export const kidsMovieUrl =
  base_url +
  "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
  api_key;
