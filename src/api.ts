import axios from "axios"

export const getNowPlayingMovies = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      Accept: 'application/json'
    }
  });
  return response.data.results;
};

export const getPopularMovies = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      Accept: 'application/json'
    }
  });
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      Accept: 'application/json'
    }
  });
  return response.data;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      Accept: 'application/json'
    }
  });
  return response.data;
};

export const getMovieReviews = async (movieId: string) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      Accept: 'application/json'
    }
  });
  return response.data;
};