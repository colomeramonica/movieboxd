import { useEffect, useState } from "react";
import { MovieInterface } from "../types";
import MovieMiniature from "./MovieMiniature";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieSection({ list, itemsPerPage, title }: { list: MovieInterface[], itemsPerPage: number, title: string }) {
  const [startStep, setStartStep] = useState(0);
  const [endStep, setEndStep] = useState(itemsPerPage);
  const [moviesShown, setMoviesShown] = useState<MovieInterface[]>([]);

  useEffect(() => {
    setMoviesShown(list.slice(startStep, endStep));
  }, [list, startStep, endStep]);

  const handlePrev = () => {
    const newStartStep = itemsPerPage - startStep;
    const newEndStep = endStep - itemsPerPage;

    if (newStartStep >= 0) {
      setStartStep(newStartStep);
      setEndStep(newEndStep);
      setMoviesShown(list.slice(newStartStep, newEndStep));
    }
  }

  const handleNext = () => {
    const newStartStep = startStep + itemsPerPage;
    const newEndStep = endStep + itemsPerPage;

    if (newStartStep < list.length) {
      setStartStep(newStartStep);
      setEndStep(newEndStep);
      setMoviesShown(list.slice(newStartStep, newEndStep));
    }
  }

  return (
    <section>
      <div className="flex flex-row justify-between">
        <h1 className="font-light font-sans mx-3 text-gray-500 tracking-wide uppercase">{title}</h1>
        <div className="align-middle flex flex-row justify-between">
          {startStep >= itemsPerPage &&
            <ChevronLeft
              color="#99aabb"
              size={24}
              onClick={handlePrev}
              className="align-middle cursor-pointer" />
          }
          <ChevronRight
            color="#99aabb"
            size={24}
            onClick={handleNext}
            className="align-middle cursor-pointer" />
        </div>
      </div>
      <hr className="bg-neutral-100 border-t-0 dark:bg-white/10 h-[1px]"></hr>
      <div className="flex flex-nowrap flex-row p-3">
        {moviesShown.map((movie) => (
          <MovieMiniature key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}