import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { searchMovies } from '../api';
import { MovieInterface } from '../types';
import MenuBar from '../components/MenuBar';
import MovieSection from '../components/MovieSection';

export default function SearchResults() {
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    async function fetchMovies() {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error(error);
      }
    }

    if (query) {
      fetchMovies();
    }
  }, [query]);

  return (
    <section className="bg-gradient-to-br from-bunker-900 h-full items-center justify-center min-h-screen p-3 to-picton-blue-950">
      <MenuBar />
      <div className="flex flex-col p-4">
        <div className="backdrop-blur-lg backdrop-filter bg-opacity-20 bg-white flex flex-col flex-grow gap-12 p-3 rounded-lg shadow-lg w-full">
          <div className="p-3 search">
            <MovieSection
              list={movies}
              itemsPerPage={6}
              title={`Search Results for "${query}"`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
