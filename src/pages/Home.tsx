import { useEffect, useState } from 'react';
import { getNowPlayingMovies, getPopularMovies } from '../api';
import { MovieInterface } from '../types';
import MovieSection from '../components/MovieSection';
import MenuBar from '../components/MenuBar';

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieInterface[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieInterface[]>([]);
  const moviesPerPage = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      const [nowPlaying, popular] = await Promise.all([
        getNowPlayingMovies(),
        getPopularMovies(),
      ]);
      setNowPlayingMovies(nowPlaying);
      setPopularMovies(popular);
    };
    fetchMovies();
  }, []);

  return (
    <section className="bg-gradient-to-br from-bunker-900 h-full items-center justify-center min-h-screen p-3 to-picton-blue-950">
      <MenuBar />
      <div className="flex flex-col p-4">
        <div className="backdrop-blur-lg backdrop-filter bg-opacity-20 bg-white flex flex-col gap-12 p-3 rounded-lg shadow-lg w-full">
          <div className="now-playing p-3">
            <MovieSection list={nowPlayingMovies} itemsPerPage={moviesPerPage} title="Now Playing" />
          </div>
          <div className="p-3 popular">
            <MovieSection list={popularMovies} itemsPerPage={moviesPerPage} title="Popular" />
          </div>
        </div>
      </div>
    </section>
  );
};