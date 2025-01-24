export interface MovieInterface {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Genre[];
  reviews: Review[];
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface LoginResponse {
    token: string;
    user: UserInterface;
    message: string;
  errors?: {
    [key: string]: string[];
  };
}