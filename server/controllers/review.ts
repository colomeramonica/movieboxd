import { Review } from '../models/review'

export const reviewsByMovie = (req, res) => {
  try {
    Review.findAll({
      where: { movieId: req.query.movieId }
    })
  } catch (error) {
    return res.json({
      message: "Unable to perform search.",
      error: error.original,
    });
  }
}

export const reviewsByUser = (req, res) => {
  try {
    Review.findAll({
      where: { userId: req.query.userId }
    })
  } catch (error) {
    return res.json({
      message: "Unable to perform search.",
      error: error.original,
    });
  }
}

export const newReview = async (req, res) => {
  try {
    const user = await Review.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.json({
      message: "Unable to add review.",
      error: error.original,
  });
  }
}
