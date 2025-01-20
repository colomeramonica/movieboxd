import { MovieInterface } from "../types";

interface MovieMiniatureProps {
  movie: MovieInterface;
}

export default function MovieMiniature({ movie }: MovieMiniatureProps) {
  return (
    <div className="border-body h-[200px] ml-2 w-[150px]">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title} />
    </div>
  )
}