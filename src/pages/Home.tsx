import { useEffect, useState } from "react";
import { getNowPlayingMovies, getPopularMovies } from "../api";
import { MovieInterface } from "../types";
import MovieSection from "../components/MovieSection";

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieInterface[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieInterface[]>([]);
  const moviesPerPage = 7;

  useEffect(() => {
    async function fetchNowPlayingMovies() {
      const nowPlaying = await getNowPlayingMovies();
      setNowPlayingMovies(nowPlaying);
    }
    async function fetchPopularMovies() {
      const popular = await getPopularMovies();
      setPopularMovies(popular);
    }
    fetchNowPlayingMovies();
    fetchPopularMovies();
  }, []);

  return (
    <div className="bg-bunker-800 min-h-screen">
      <div className="now-playing p-3">
        <MovieSection list={nowPlayingMovies} itemsPerPage={moviesPerPage} title="Now Playing" />
      </div>
      <div className="p-3 popular">
        <MovieSection list={popularMovies} itemsPerPage={moviesPerPage} title="Popular" />
      </div>
    </div>
  );
};