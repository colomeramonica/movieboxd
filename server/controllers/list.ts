import { List, ListItem } from "../models/list";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

interface AddToListRequest extends Request { 
  body: {
    movieId: string;
    userId: string;
    listSlug: string
  };
};

interface CreateDefaultListsParams {
  userId: string;
}

export const addToList = async (req: AddToListRequest, res: Response) => {
  try {
    const { movieId, userId, listSlug } = req.body;
    const list = await List.findOne({ where: { userId, slug: listSlug } });
    const listId = list?.id;
    if (!listId) {
      return res.status(404).json('List not found.');
    }

    await ListItem.create({
      id: uuidv4(),
      listId,
      movieId,
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

export const getListById = async (req: Request, res: Response) => { 
  try {
    const listId = req.query.listId as string;
    const list = await List.findOne({ where: { id: listId } });
    return res.status(200).json(list);
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
