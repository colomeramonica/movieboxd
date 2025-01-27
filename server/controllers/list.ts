import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { verifyAccessToken } from "./base";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AddToListRequest extends Request { 
  body: {
    movieId: string;
    accessToken: string;
    listSlug: string
  };
};

interface CreateDefaultListsParams {
  userId: number;
}

export const addToList = async (req: AddToListRequest, res: Response) => {
  try {
    const { movieId, accessToken, listSlug } = req.body;
    const userId = verifyAccessToken(accessToken);

    const list = await prisma.list.findFirst(
      {
        where:
        {
          userId: Number(userId),
          slug: listSlug
        }
      });
    if (!list || list === null) {
      return res.status(404).json({
        message: "List not found.",
        error: 404
      });
    }

    const checkIfMovieIsInList = await prisma.listItem.findFirst(
      {
        where:
        {
          listId: list.id,
          movieId: movieId
        }
      });
    if (checkIfMovieIsInList) {
      await prisma.listItem.deleteMany({ where: { listId: Number(list.id), movieId: movieId } });
      return res.status(201).json({
        message: "Movie removed from list.",
        code: 201,
      });
    }

    const listId = list.id;

    await prisma.listItem.create({
      data: {
        listId,
        movieId: String(movieId),
      },
    });
    return res.status(201).json({
      message: "Movie added to list.",
      code: 201,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to add movie to list.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getListsByUserId = async (req: Request, res: Response) => { 
  try {
    const userId = req.query.userId;
    const lists = await prisma.list.findMany({ where: { userId: Number(userId) } });
    return res.status(200).json(lists);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get lists.",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export const getListDetails = async (req: Request, res: Response) => { 
  try {
    const accessToken = req.query.accessToken as string;
    const listSlug = req.params.listSlug as string;
    const userId = verifyAccessToken(accessToken);

    const list = await prisma.list.findFirst({ where: { userId: Number(userId), slug: listSlug } });
    if (!list || list === null) {
      return res.status(404).json({
        message: "List not found.",
        error: 404
      });
    }

    const listItems = await prisma.listItem.findMany({ where: { listId: Number(list.id) } });
    return res.status(200).json(listItems);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get list.",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export const createDefaultLists = async ({ userId }: CreateDefaultListsParams) => {
  try {
    await prisma.list.create({
      data: {
        userId: userId,
        name: "Watchlist",
        slug: "watchlist",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    await prisma.list.create({
      data: {
        userId: userId,
        name: "Favorites",
        slug: "favorites",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
  } catch (error) { 
    console.error("Unable to create default lists:", error);
  }
}
