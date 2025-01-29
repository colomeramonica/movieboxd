import axios from 'axios';

export const getNowPlayingMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data.results;
};

export const getPopularMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data;
};

export const getMovieReviews = async (movieId: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data;
};

export const searchMovies = async (query: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data.results;
};

export const addToList = async ({
  accessToken,
  movieData,
  listSlug,
}: {
  accessToken: string;
  movieData: {};
  listSlug: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/add-to-list`,
    { accessToken, movieData, listSlug },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const getUsersLists = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/lists`, {
    params: { accessToken },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response.data;
};

export const getListDetails = async ({
  accessToken,
  listSlug,
}: {
  accessToken: string;
  listSlug: string;
}) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/list/${listSlug}`,
    {
      params: { accessToken },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
  return response.data;
};

export const addNewReview = async ({
  accessToken,
  movieId,
  rating,
  review,
}: {
  accessToken: string;
  movieId: string;
  rating: number;
  review: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/add-review`,
    { accessToken, movieId, rating, review },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
  return response.data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/login`,
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const getProfile = async ({ accessToken }: { accessToken: string }) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/profile?${accessToken}`,
    {
      params: { accessToken },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const editProfile = async ({
  accessToken,
  username,
  email,
  password,
  name,
  avatar,
  bio,
}: {
  accessToken: string;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  avatar?: string;
  bio?: string;
}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/profile`,
    { accessToken, username, email, password, name, avatar, bio },
    {
      params: { accessToken },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
