import { useNavigate } from "react-router";
import { MovieInterface } from "../types";

interface MovieMiniatureProps {
  movie: MovieInterface;
}

export default function MovieMiniature({ movie }: MovieMiniatureProps) {
  const navigate = useNavigate();
  return (
    <div
      className="border-body h-[200px] ml-2 rounded-lg shadow-lg w-[150px]"
      onClick={() => navigate(`/movie/${movie.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="cursor-pointer rounded-lg"
      />
    </div>
  )
}