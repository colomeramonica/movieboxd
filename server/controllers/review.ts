import { Request, Response } from 'express';
import { Review } from '../models/review'

export const reviewsByMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.query.movieId as string;
    await Review.findAll({ where: { movieId: movieId }})
  } catch (error) {
    return res.json({
      message: "Unable to perform search.",
      error: error instanceof Error ? error.message : error,
    });
  }
}

// export const reviewsByUser = (req: Request, res: Response) => {
//   try {
//     const { userId } = req.query;
//     Review.findAll({
//       where: { userId: req.query.userId }
//     })
//   } catch (error) {
//     return res.json({
//       message: "Unable to perform search.",
//       error: error instanceof Error ? error.message : error,
//     });
//   }
// }

export const newReview = async (req: Request, res: Response) => {
  try {
    const user = await Review.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.json({
      message: "Unable to add review.",
      error: error instanceof Error ? error.message : error,
  });
  }
}
