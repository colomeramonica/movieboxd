import { useNavigate } from "react-router";
import { MovieInterface } from "../types";

interface MovieMiniatureProps {
  movie: MovieInterface;
}

export default function MovieMiniature({ movie }: MovieMiniatureProps) {
  const navigate = useNavigate();
  return (
    <div
      className="backdrop-blur-lg backdrop-filter bg-opacity-30 bg-white border-body h-[300px] ml-2 rounded-lg shadow-lg w-[250px]"
      onClick={() => navigate(`/movie/${movie.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="cursor-pointer rounded-lg"
      />
    </div>
  )
}