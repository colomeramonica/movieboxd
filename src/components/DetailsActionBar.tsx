import { Clock, Heart, LoaderCircle, Plus } from "lucide-react";
import { addToList, getListDetails } from "../api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function DetailsActionBar() {
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [filmsFavorite, setFilmsFavorite] = useState(false);
  const [filmsWatchlisted, setFilmsWatchlisted] = useState(false);

  const { id } = useParams();

  async function fetchList(slug: string) {
    const accessToken = localStorage.getItem("access-token") as string;
    await getListDetails({ accessToken, listSlug: slug }).then((response) => {
      if (response && response.some((item: any) => item.movieId === id)) {
        if (slug === "favorites") {
          setFilmsFavorite(true);
        } else if (slug === "watchlist") {
          setFilmsWatchlisted(true);
        }
      }
    });
  }

  useEffect(() => {
    fetchList("favorites");
    fetchList("watchlist");
  }, []);

  const openNewReviewModal = () => { };

  const handleAddToList = async (listSlug: string, setLoading: (loading: boolean) => void, fetchList: (slug: string) => void) => {
    setLoading(true);
    await addToList({
      accessToken: localStorage.getItem("access-token") as string,
      movieId: id as string,
      listSlug
    }).then(() => {
      setLoading(false);
      fetchList(listSlug);
    });
  };

  interface IconProps {
    size?: number;
    className?: string;
  }

  interface ButtonProps {
    onClick: () => void;
    loading: boolean;
    icon: React.ComponentType<IconProps> | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    isActive: boolean;
    activeClass: string;
    hoverClass: string;
  }

  const Button: React.FC<ButtonProps> = ({ onClick, loading, icon: Icon, label, isActive, activeClass, hoverClass }) => (
    <button
      onClick={onClick}
      className="duration-200 flex group groupitems-center h-16 overflow-x-visible overflow-y-clip p-2 relative rounded-lg space-x-2 text-center transition-colors w-14">
      <span className={`absolute backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white duration-300 group-hover:origin-top ${hoverClass} p-2 rounded-full shadow-lg top-0 transition-all`}>
        {loading ? <LoaderCircle size={20} className={`animate-spin ${activeClass}`} /> : <Icon size={20} className={`hover:animate-bounce ${isActive ? activeClass : hoverClass}`} />}
        <span className="-bottom-36 -translate-x-1/2 absolute duration-300 font-bold group-hover:-bottom-5 left-1/2 text-black text-center text-sm transform transition-all whitespace-nowrap">{label}</span>
      </span>
    </button>
  );

  return (
    <section>
      <div className="flex flex-row gap-10 items-center justify-center p-3 rounded-2xl space-x-4">
        <Button
          onClick={openNewReviewModal}
          loading={false}
          icon={Plus}
          label="Log review"
          isActive={false}
          activeClass="stroke-malachite-400"
          hoverClass="hover:shadow-malachite-300/50"
        />
        <Button
          onClick={() => handleAddToList("watchlist", setWatchlistLoading, fetchList)}
          loading={watchlistLoading}
          icon={Clock}
          label="Add to watchlist"
          isActive={filmsWatchlisted}
          activeClass="fill-west-side-400 stroke-west-side-200"
          hoverClass="hover:shadow-west-side-500/50"
        />
        <Button
          onClick={() => handleAddToList("favorites", setFavoritesLoading, fetchList)}
          loading={favoritesLoading}
          icon={Heart}
          label="Add to favorites"
          isActive={filmsFavorite}
          activeClass="fill-east-bay-700"
          hoverClass="hover:shadow-east-bay-400/50"
        />
      </div>
    </section>
  );
}