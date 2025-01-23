import { useState } from "react";
import { Star } from "lucide-react";

export default function Rating() {
  const [rating, setRating] = useState(0);

  const ratingText = () => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  }

  const stars = [
    { id: "star1", value: 1, supportText: "Poor" },
    { id: "star2", value: 2, supportText: "Fair" },
    { id: "star3", value: 3, supportText: "Good" },
    { id: "star4", value: 4, supportText: "Very Good" },
    { id: "star5", value: 5, supportText: "Excellent" },
  ];

  return (
    <div className="flex flex-row items-center">
      {stars.map((star) => (
        <>
          <div key={star.id}>
            <input
              type="radio"
              id={star.id}
              name="rate"
              value={star.value}
              className="hidden peer"
              checked={rating === star.value}
              onChange={() => setRating(star.value)}
            />
            <label
              htmlFor={star.id}
              className={`cursor-pointer text-west-side-400`}
            >
              <Star size={24} className={`${rating >= star.value ? `fill-west-side-400 stroke-wesfill-west-side-400` : 'fill-gray-400 stroke-gray-400'}`} />
            </label>
          </div>
          <div className="flex flex-row items-center">
          </div>
        </>
      ))}
      <span className="flex items-center ml-3 text-bunker-800">{ratingText()}</span>
    </div>
  );
}