import { List, ListItem } from "../models/list";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { verifyAccessToken } from "./base";

interface AddToListRequest extends Request { 
  body: {
    movieId: string;
    accessToken: string;
    listSlug: string
  };
};

interface CreateDefaultListsParams {
  userId: string;
}

export const addToList = async (req: AddToListRequest, res: Response) => {
  try {
    const { movieId, accessToken, listSlug } = req.body;
    const userId = verifyAccessToken(accessToken);
    const list = await List.findOne({ where: { userId, slug: listSlug } });
    if (!list || list === null) {
      return res.status(404).json({
        message: "List not found.",
        error: 404
      });
    }

    const checkIfMovieIsInList = await ListItem.findOne({ where: { listId: list.id, movieId } });
    if (checkIfMovieIsInList) {
      ListItem.destroy({ where: { listId: list.id, movieId } });
      return res.status(201).json({
        message: "Movie removed from list.",
        code: 201,
      });
    }

    const listId = list.id;

    await ListItem.create({
      id: uuidv4(),
      listId,
      movieId,
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
    const userId = req.query.userId as string;
    const lists = await List.findAll({ where: { userId } });
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

    const list = await List.findOne({ where: { userId, slug: listSlug } });
    if (!list || list === null) {
      return res.status(404).json({
        message: "List not found.",
        error: 404
      });
    }

    const listItems = await ListItem.findAll({ where: { listId: list.id } });
    return res.status(200).json(listItems);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get list.",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export const createDefaultLists = ({ userId }: CreateDefaultListsParams): void => {
  List.create({
    id: uuidv4(),
    userId,
    name: "Watchlist",
    slug: "watchlist",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  List.create({
    id: uuidv4(),
    userId,
    name: "Favorites",
    slug: "favorites",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
