import {Movie} from '../models/movie';

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    return res.json({
      message: "Unable to create a record!",
      error: error.original,
  });
  }
}

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      attributes: ["id", "title", "author"],
    });
    return res.res.status(201).json(movies);
  } catch (error) {
    return res.json({
      message: "Unable to create a record!",
      error: error.original,
  });
  }
}