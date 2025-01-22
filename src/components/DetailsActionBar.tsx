import { Clock, Heart, LoaderCircle, Plus } from "lucide-react";
import { addToList } from "../api";
import { useParams } from "react-router";
import { useState } from "react";

export default function DetailsActionBar() {
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const { id } = useParams();
  const openNewReviewModal = () => {

  };

  const addToFavorites = async () => {
    setFavoritesLoading(true);
    await addToList({
      accessToken: localStorage.getItem("access-token") as string,
      movieId: id as string,
      listSlug: "favorites"
    }).then(() => {
      setFavoritesLoading(false);
    });
  };

  const addToWatchlist = async () => {
    setWatchlistLoading(true);
    await addToList({
      accessToken: localStorage.getItem("access-token") as string,
      movieId: id as string,
      listSlug: "watchlist"
    }).then(() => {
      setWatchlistLoading(false);
    });
  };

  return (
    <section>
      <div className="flex flex-row gap-10 items-center justify-center p-3 rounded-2xl space-x-4">
        <button
          onClick={openNewReviewModal}
          className="duration-200 flex group groupitems-center h-16 overflow-x-visible overflow-y-clip p-2 relative rounded-lg space-x-2 text-center transition-colors w-14">
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white duration-300 group-hover:origin-top hover:shadow-malachite-300/50 p-2 rounded-full shadow-lg top-0 transition-all">
            <Plus size={20} className="hover:animate-bounce hover:fill-malachite-400 hover:stroke-malachite-400" />
            <span className="-bottom-36 -translate-x-1/2 absolute duration-300 font-bold group-hover:-bottom-5 left-1/2 text-black text-center text-malachite-400 text-sm transform transition-all whitespace-nowrap">Log review</span>
          </span>
        </button>
        <button
          onClick={addToWatchlist}
          className="duration-200 flex group groupitems-center h-16 overflow-x-visible overflow-y-clip p-2 relative rounded-lg space-x-2 text-center transition-colors w-14">
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white duration-300 group-hover:origin-top hover:shadow-west-side-500/50 p-2 rounded-full shadow-lg top-0 transition-all">
            {watchlistLoading ?
              <LoaderCircle size={20} className="animate-spin" />
              : <Clock size={20} className="hover:animate-bounce hover:stroke-west-side-400" />}
            <span className="-bottom-36 -translate-x-1/2 absolute duration-300 font-bold group-hover:-bottom-5 left-1/2 text-black text-center text-sm text-west-side-400 transform transition-all whitespace-nowrap">Add to watchlist</span>
          </span>
        </button>
        <button
          onClick={addToFavorites}
          className="duration-200 flex group groupitems-center h-16 overflow-x-visible overflow-y-clip p-2 relative rounded-lg space-x-2 text-center transition-colors w-14">
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white duration-300 group-hover:origin-top hover:shadow-east-bay-400/50 p-2 rounded-full shadow-lg top-0 transition-all">
            {favoritesLoading ?
              <LoaderCircle size={20} className="animate-spin" />
              : <Heart size={20} className="hover:animate-bounce hover:fill-east-bay-700 hover:stroke-east-bay-700" />}
            <span className="-bottom-10 -translate-x-1/2 absolute duration-300 font-bold group-hover:-bottom-5 left-1/2 text-black text-center text-east-bay-300 text-sm transform transition-all whitespace-nowrap">Add to favorites</span>
          </span>
        </button>
      </div>
    </section>
  );
}