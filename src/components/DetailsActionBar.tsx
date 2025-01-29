import { Clock, Heart, LoaderCircle, Plus } from 'lucide-react';
import { addToList, getListDetails } from '../api';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ReviewModal from './ReviewModal';
import { ListItemInterface, MovieInterface } from '../types';

interface DetailsActionBarProps {
  movie: MovieInterface;
}

export default function DetailsActionBar({ movie }: DetailsActionBarProps) {
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [filmsFavorite, setFilmsFavorite] = useState(false);
  const [filmsWatchlisted, setFilmsWatchlisted] = useState(false);
  const [openNewReviewModal, setOpenNewReviewModal] = useState(false);

  async function fetchList(slug: string) {
    const accessToken = localStorage.getItem('access-token') as string;
    const response = await getListDetails({ accessToken, listSlug: slug });
    if (
      response &&
      response.some((item: ListItemInterface) => item.movieId === movie.id)
    ) {
      if (slug === 'favorites') {
        setFilmsFavorite(true);
      } else if (slug === 'watchlist') {
        setFilmsWatchlisted(true);
      }
    }
  }

  useEffect(() => {
    fetchList('favorites');
    fetchList('watchlist');
  }, []);

  const onClose = () => {
    setOpenNewReviewModal(false);
  };

  const handleAddToList = async (
    listSlug: string,
    setLoading: (loading: boolean) => void,
    fetchList: (slug: string) => void
  ) => {
    setLoading(true);
    await addToList({
      accessToken: localStorage.getItem('access-token') as string,
      movieData: {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      },
      listSlug,
    }).then(() => {
      setLoading(false);
      fetchList(listSlug);
    });
  };

  return (
    <section>
      <div className="flex flex-row gap-10 items-center justify-center p-3 rounded-2xl space-x-4">
        <button
          onClick={() => setOpenNewReviewModal(true)}
          className="duration-200 flex group groupitems-center h-16 overflow-x-visible overflow-y-clip p-2 relative rounded-lg space-x-2 text-center transition-colors w-14"
        >
          <span className="align-middle backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white duration-300 flex group-hover:origin-top hover:shadow-malachite-300/50 items-center p-2 rounded-full shadow-lg top-0 transition-all">
            <Plus
              size={20}
              className="hover:animate-bounce hover:fill-malachite-400 stroke-malachite-400"
            />
            <span className="-bottom-36 -translate-x-1/2 absolute duration-300 font-bold group-hover:-bottom-5 left-1/2 text-black text-center text-malachite-400 text-sm transform transition-all whitespace-nowrap">
              Log review
            </span>
          </span>
        </button>
        <button
          onClick={() =>
            handleAddToList('watchlist', setWatchlistLoading, fetchList)
          }
          className="duration-200 flex group groupitems-center h-16 overflow-x-visible overflow-y-clip p-2 relative rounded-lg space-x-2 text-center transition-colors w-14"
        >
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white duration-300 group-hover:origin-top hover:shadow-west-side-500/50 p-2 rounded-full shadow-lg top-0 transition-all">
            {watchlistLoading ? (
              <LoaderCircle
                size={20}
                className="animate-spin stroke-west-side-400"
              />
            ) : (
              <Clock
                size={20}
                className={`hover:animate-bounce ${
                  filmsWatchlisted
                    ? 'stroke-west-side-300 fill-west-side-400'
                    : 'stroke-west-side-400'
                }`}
              />
            )}
            <span className="-bottom-36 -translate-x-1/2 absolute duration-300 font-bold group-hover:-bottom-5 left-1/2 text-black text-center text-sm text-west-side-400 transform transition-all whitespace-nowrap">
              Add to watchlist
            </span>
          </span>
        </button>
        <button
          onClick={() =>
            handleAddToList('favorites', setFavoritesLoading, fetchList)
          }
          className="duration-200 flex group groupitems-center h-16 overflow-x-visible overflow-y-clip p-2 relative rounded-lg space-x-2 text-center transition-colors w-14"
        >
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white duration-300 group-hover:origin-top hover:shadow-east-bay-400/50 p-2 rounded-full shadow-lg top-0 transition-all">
            {favoritesLoading ? (
              <LoaderCircle
                size={20}
                className="animate-spin stroke-east-bay-700"
              />
            ) : (
              <Heart
                size={20}
                className={`hover:animate-bounce ${
                  filmsFavorite
                    ? 'fill-east-bay-700 stroke-east-bay-700'
                    : 'hover:fill-east-bay-700 hover:stroke-east-bay-700'
                }  stroke-east-bay-700`}
              />
            )}
            <span className="-bottom-10 -translate-x-1/2 absolute duration-300 font-bold group-hover:-bottom-5 left-1/2 text-black text-center text-east-bay-300 text-sm transform transition-all whitespace-nowrap">
              Add to favorites
            </span>
          </span>
        </button>
        {openNewReviewModal &&
          createPortal(<ReviewModal onClose={onClose} />, document.body)}
      </div>
    </section>
  );
}
