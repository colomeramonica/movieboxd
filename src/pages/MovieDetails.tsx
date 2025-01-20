import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieDetails } from "../api";
import { MovieInterface } from "../types";
import { Clock9, Heart, Plus } from "lucide-react";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<MovieInterface | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchMovieDetails() {
      if (id) {
        const movieDetails = await getMovieDetails(id);
        setMovieDetails(movieDetails);
      }
    }
    fetchMovieDetails();
  }, [id]);
  return (
    <section className="bg-bunker-800 min-h-screen p-3">
      {movieDetails && (
        <div className="flex flex-row">
          <div className="flex flex-col items-center justify-center w-1/2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="h-[400px] w-[300px]"
            />
            <div className="flex flex-col">
              <button className="border border-malachite-600 flex flex-row font-sans gap-1 hover:bg-malachite-500 my-2 p-1 rounded-lg text-white w-full">
                <Plus size={20} />
                Log review
              </button>
              <button className="border border-west-side-600 flex flex-row font-sans gap-1 hover:bg-west-side-500 my-2 p-1 rounded-lg text-white w-full">
                <Clock9 size={20} />
                Add to watchlist
              </button>
              <button className="border border-east-bay-600-600 flex flex-row font-sans gap-1 hover:bg-east-bay-500 my-2 p-1 rounded-lg text-white w-full">
                <Heart size={20} />
                Add to favorites
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-1/2">
            <h1 className="font-bold font-sans px-3 text-2xl text-gray-400 text-wrap">
              {movieDetails.title}
            </h1>
            <h2 className="font-sans p-3 text-gray-300 text-sm text-wrap">
              {movieDetails.tagline}
            </h2>
            <p className="font-sans p-3 text-gray-300 text-sm text-wrap">
              {movieDetails.overview}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};