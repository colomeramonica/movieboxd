import { User } from "../models/user";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

interface CreateAccountRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
}

interface EditProfileRequest extends Request {
  body: {
    username?: string;
    email?: string;
    password?: string;
  };
  params: {
    userId: string;
  };
}

interface GetProfileRequest extends Request {
  params: {
    userId: string;
  };
}

export const createAccount = async (req: CreateAccountRequest, res: Response) => {
  try {
    await User.create({ ...req.body, id: uuidv4() });
    return res.status(201).json('Account created successfully.');
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create account.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const editProfile = async (req: EditProfileRequest, res: Response) => {
  try {
    const updatedUser = await User.update(req.body, { where: { id: req.params.userId } });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.json({
      message: "Unable to update the user.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getProfile = async (req: GetProfileRequest, res: Response) => {
  try {
    const user = await User.findByPk(req.params.userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.json({
      message: "User not found.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found.",
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.json({
      message: "Error finding users.",
      error: error,
    });
  }
};

