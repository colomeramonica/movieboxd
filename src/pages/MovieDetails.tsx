import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getMovieDetails, getMovieReviews } from "../api";
import { MovieInterface, Review } from "../types";
import { CircleUserRound, Clock9, ArrowLeft, CalendarHeart, Star } from "lucide-react";
import DetailsActionBar from "../components/DetailsActionBar";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<MovieInterface | null>(null);
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

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
    navigate('/home');
  };

  const toggleReviewExpansion = (id: string) => {
    setExpandedReviewId(expandedReviewId === id ? null : id);
  };

  return (
    <section className="bg-bunker-800 flex flex-col min-h-screen p-3">
      <div className="backdrop-blur-lg backdrop-filter bg-opacity-10 flex items-center mb-4 movie-poster p-4 relative rounded-2xl shadow-lg z-10">
        <button onClick={handleBackClick} className="flex items-center text-white">
          <ArrowLeft size={20} />
          <span className="ml-2">Back</span>
        </button>
        <span className="ml-4 text-gray-400">/ Movies</span>
      </div>
      {movieDetails && (
        <>
          <div className="flex flex-col gap-20 items-center justify-center md:flex-row">
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
                <DetailsActionBar />
              </div>
            </div>
            <div className="backdrop-blur-lg backdrop-filter bg-opacity-40 bg-white flex p-4 relative rounded-2xl shadow-lg w-[500px] z-10">
              <div className="flex flex-col items-center justify-between">
                <h1 className="font-bold text-3xl text-bunker-900">{movieDetails.title}</h1>
                <div className="flex items-center space-x-2 text-bunker-900">
                  <Star size={20} />
                  <span>{movieDetails.vote_average.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-light italic text-bunker-900">{movieDetails.tagline}</span>
                </div>
                <div className="flex flex-col items-center p-3">
                  <p className="text-bunker-900 text-center text-pretty">
                    {movieDetails.overview}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-center p-3">
                  <div className="flex items-center space-x-2 text-bunker-900">
                    <Clock9 size={20} />
                    <span>{movieDetails.runtime} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-bunker-900">
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
                    <span key={genre.id} className="backdrop-blur-lg backdrop-filter bg-opacity-10 bg-white p-2 rounded-2xl shadow-lg text-bunker-900">{genre.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {movieReviews && movieReviews.length > 0 && (
        <div className="flex flex-col items-start justify-start my-24 p-6 w-full">
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