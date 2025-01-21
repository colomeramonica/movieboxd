import { Clock, Heart, LoaderCircle, Plus } from "lucide-react";
import { addToList } from "../api";
import { useParams } from "react-router";
import { useState } from "react";

export default function DetailsActionBar() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const openNewReviewModal = () => {

  };

  const addToFavorites = async () => {
    setLoading(true);
    await addToList({
      userId: import.meta.env.VITE_USER_ID,
      movieId: id as string,
      listSlug: "favorites"
    }).then(() => {
      setLoading(false);
    });
  };

  const addToWatchlist = async () => {
    await addToList({
      userId: import.meta.env.VITE_USER_ID,
      movieId: id as string,
      listSlug: "watchlist"
    });
  };

  return (
    <section>
      <div className="flex flex-row gap-10 items-center justify-center p-2 rounded-2xl space-x-4">
        <button
          onClick={openNewReviewModal}
          className="align-middle duration-200 flex groupitems-center items-center p-2 relative rounded-lg space-x-2 transition-colors">
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white hover:shadow-malachite-300/50 p-2 rounded-full shadow-lg">
            <Plus size={20} className="hover:animate-bounce hover:fill-malachite-400 hover:stroke-malachite-400" />
          </span>
        </button>
        <button
          onClick={addToWatchlist}
          className="duration-200 flex groupitems-center p-2 relative rounded-lg space-x-2 transition-colors">
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white hover:shadow-west-side-500/50 p-2 rounded-full shadow-lg">
            <Clock size={20} className="hover:animate-bounce hover:stroke-west-side-400" />
          </span>
        </button>
        <button
          onClick={addToFavorites}
          className="duration-200 flex groupitems-center p-2 relative rounded-lg space-x-2 transition-colors">
          <span className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white hover:shadow-east-bay-400/50 p-2 rounded-full shadow-lg">
            {loading && <LoaderCircle size={20} className="animate-spin" />}
            {!loading && <Heart size={20} className="ho hover:animate-bounce hover:fill-east-bay-700 hover:stroke-east-bay-700 ver:stroke-east-bay-700" />}
          </span>
        </button>
      </div>
    </section>
  );
}