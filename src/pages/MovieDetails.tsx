import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getMovieDetails, getMovieReviews } from "../api";
import { MovieInterface, Review } from "../types";
import { CircleUserRound, Clock9, Heart, Plus, ArrowLeft, CalendarHeart, Clock, HeartIcon } from "lucide-react";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<MovieInterface | null>(null);
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (id) {
        const movieDetails = await getMovieDetails(id);
        setMovieDetails(movieDetails);
        const reviews = await getMovieReviews(id);
        setMovieReviews(reviews.results);
      }
    }
    fetchMovieDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const toggleReviewExpansion = (id: string) => {
    setExpandedReviewId(expandedReviewId === id ? null : id);
  };

  return (
    <section className="bg-bunker-800 min-h-screen p-3">
      <div className="backdrop-blur-lg backdrop-filter bg-opacity-10 flex items-center mb-4 movie-poster p-4 relative rounded-2xl shadow-lg z-10">
        <button onClick={handleBackClick} className="flex items-center text-white">
          <ArrowLeft size={20} />
          <span className="ml-2">Back</span>
        </button>
        <span className="ml-4 text-gray-400">/ Movies</span>
      </div>
      {movieDetails && (
        <>
          <div className="flex flex-col gap-20 justify-center md:flex-row">
            <div className="absolute bg-center bg-cover blur-lg filter inset-0 z-0"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})`,
              }}
            ></div>
            <div className="backdrop-blur-lg backdrop-filter bg-opacity-30 bg-white movie-poster p-4 relative rounded-2xl shadow-lg z-10">
              <div className="flex flex-col items-center justify-between">
                <img
                  className="h-[500px] rounded-lg shadow-lg w-[350px]"
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title} />
              </div>
              <div className="flex flex-col justify-center p-2">
                <div className="flex">
                  <button className="duration-500 flex group h-8 hover:border hover:border-west-side-500 hover:w-52 items-center justify-center relative rounded-full text-gray-300 transition-colors">
                    <Clock size={20} className="absolute duration-500 group-hover:left-2 group-hover:stroke-west-side-500 h-10 left-10 rounded-full transition-all" />
                    <span className="absolute duration-500 group-hover:opacity-100 opacity-0 text-west-side-500 transition-all">Add to watchlist</span>
                  </button>
                </div>
                <div className="">
                  <button className="duration-500 flex group h-8 hover:border hover:border-malachite-500 hover:w-52 items-center justify-center relative rounded-full text-gray-300 transition-colors">
                    <Plus size={20} className="absolute duration-500 group-hover:fill-malachite-600 group-hover:left-2 group-hover:stroke-malachite-600 h-10 left-10 rounded-full transition-all" />
                    <span className="absolute duration-500 group-hover:opacity-100 opacity-0 text-malachite-500 transition-all">Log review</span>
                  </button>
                </div>
                <div className="">
                  <button className="duration-500 flex group h-8 hover:border hover:border-east-bay-500 hover:w-52 items-center justify-center relative rounded-full text-gray-300 transition-colors">
                    <HeartIcon size={20} className="absolute duration-500 group-hover:fill-east-bay-700 group-hover:left-2 group-hover:stroke-east-bay-700 h-10 left-10 rounded-full transition-all" />
                    <span className="absolute duration-500 group-hover:opacity-100 opacity-0 text-east-bay-500 transition-all">Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-lg backdrop-filter bg-opacity-30 bg-white p-4 relative rounded-2xl shadow-lg w-[500px] z-10">
              <div className="flex flex-col items-center justify-between">
                <h1 className="font-bold text-3xl">{movieDetails.title}</h1>
                <div className="flex items-center space-x-2">
                  <Heart size={20} />
                  <span>{movieDetails.vote_average.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-light italic">{movieDetails.tagline}</span>
                </div>
                <div className="flex flex-col items-center p-3">
                  <p className="text-center text-pretty">
                    {movieDetails.overview}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-center p-3">
                  <div className="flex items-center space-x-2">
                    <Clock9 size={20} />
                    <span>{movieDetails.runtime} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarHeart size={20} />
                    <span>{new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between p-3">
                  {movieDetails.genres.map((genre) => (
                    <span key={genre.id} className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white p-2 rounded-2xl shadow-lg">{genre.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {movieReviews && movieReviews.length > 0 && (
        <div className="flex flex-col items-start justify-start my-8 p-6 w-full">
          <h1 className="font-bold font-sans text-3xl text-gray-400">Reviews</h1>
          <div className="flex flex-col gap-4 p-3">
            {movieReviews.map((review) => (
              <div className="backdrop-blur-lg backdrop-filter bg-opacity-30 bg-white p-4 relative rounded-2xl shadow-lg z-10" key={review.id}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <div className="flex gap-1 items-center">
                      <CircleUserRound size={20} color="#ffe2a8 " />
                      <span className="text-west-side-200">{review.author}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-west-side-200">{new Date(review.created_at).toLocaleString('EN')}</span>
                    </div>
                  </div>
                  <p className={`text-gray-200 ${expandedReviewId === review.id ? '' : 'h-[200px] overflow-hidden text-clip'}`} dangerouslySetInnerHTML={{ __html: review.content }}></p>
                  <button onClick={() => toggleReviewExpansion(review.id)} className="text-east-bay-200">
                    {expandedReviewId === review.id ? 'Show less' : 'Show more'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section >
  );
};