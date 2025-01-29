import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { verifyAccessToken } from './base';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AddToListRequest extends Request {
  body: {
    movieData: {
      id: number;
      title: string;
      poster_path: string;
    };
    accessToken: string;
    listSlug: string;
  };
}

interface CreateDefaultListsParams {
  userId: number;
}

const findOrCreateMovie = async (movieData: {
  id: number;
  title: string;
  poster_path: string;
}) => {
  let movie = await prisma.movie.findFirst({
    where: { id: String(movieData.id) },
  });
  if (!movie) {
    movie = await prisma.movie.create({
      data: {
        id: String(movieData.id),
        title: movieData.title,
        poster_path: movieData.poster_path,
      },
    });
  }
  return movie;
};

export const addToList = async (req: AddToListRequest, res: Response) => {
  try {
    const { movieData, accessToken, listSlug } = req.body;
    const userId = verifyAccessToken(accessToken);

    const list = await prisma.list.findFirst({
      where: {
        userId: Number(userId),
        slug: listSlug,
      },
    });
    if (!list) {
      return res.status(404).json({
        message: 'List not found.',
        error: 404,
      });
    }

    const movie = await findOrCreateMovie(movieData);

    const checkIfMovieIsInList = await prisma.listItem.findFirst({
      where: {
        listId: list.id,
        movieId: String(movie.id),
      },
    });
    if (checkIfMovieIsInList) {
      await prisma.listItem.deleteMany({
        where: { listId: Number(list.id), movieId: String(movie.id) },
      });
      return res.status(201).json({
        message: 'Movie removed from list.',
        code: 201,
      });
    }

    await prisma.listItem.create({
      data: {
        listId: list.id,
        movieId: String(movie.id),
      },
    });
    return res.status(201).json({
      message: 'Movie added to list.',
      code: 201,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to add movie to list.',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getListsByUserId = async (req: Request, res: Response) => {
  try {
    const accessToken = req.query.accessToken as string;
    const userId = verifyAccessToken(accessToken);
    const listsWithMovies = await prisma.list.findMany({
      where: { userId: Number(userId) },
      include: {
        items: {
          include: {
            movie: true,
          },
        },
      },
    });
    return res.status(200).json(listsWithMovies);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to get lists.',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getListDetails = async (req: Request, res: Response) => {
  try {
    const accessToken = req.query.accessToken as string;
    const listSlug = req.params.listSlug as string;
    const userId = verifyAccessToken(accessToken);

    const list = await prisma.list.findFirst({
      where: { userId: Number(userId), slug: listSlug },
    });
    if (!list) {
      return res.status(404).json({
        message: 'List not found.',
        error: 404,
      });
    }

    const listItems = await prisma.listItem.findMany({
      where: { listId: Number(list.id) },
    });
    return res.status(200).json(listItems);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to get list.',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createDefaultLists = async ({
  userId,
}: CreateDefaultListsParams) => {
  try {
    await prisma.list.create({
      data: {
        userId: userId,
        name: 'Watchlist',
        slug: 'watchlist',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await prisma.list.create({
      data: {
        userId: userId,
        name: 'Favorites',
        slug: 'favorites',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Unable to create default lists:', error);
  }
};
