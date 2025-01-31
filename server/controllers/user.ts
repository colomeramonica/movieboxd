import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createDefaultLists } from "./list";
import { verifyAccessToken } from "./base";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    name?: string;
    avatar?: string;
    bio?: string;
  };
  params: {
    accessToken: string;
  };
}

interface GetProfileRequest extends Request {
  params: {
    accessToken: string;
  };
}

export const createAccount = async (req: CreateAccountRequest, res: Response) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });
    if (newUser) {
      createDefaultLists({ userId: newUser.id });
    }
    return res.status(201).json({
      message: 'Account created successfully.',
      code: 201,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create account.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const editProfile = async (req: EditProfileRequest, res: Response) => {
  try {
    const accessToken = req.query.accessToken as string;
    const userId = verifyAccessToken(accessToken);
    const user = await prisma.user.findFirst({ where: { id: Number(userId) } });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    let updatedData = { ...req.body };

    if (req.body.password) {
      const { password } = req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedData = { ...updatedData, password: hashedPassword };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: updatedData,
    });
    return res.status(200).json({
      message: "User updated successfully.",
      code: 200,
    });
  } catch (error) {
    return res.json({
      message: "Unable to update the user.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getProfile = async (req: GetProfileRequest, res: Response) => {
  try {
    const accessToken = req.query.accessToken as string;
    const userId = verifyAccessToken(accessToken);
    const user = await prisma.user.findFirst({ where: { id: Number(userId) } });
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
    const users = await prisma.user.findMany();
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

export const login = async (req: Request, res: Response) => { 
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password.",
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      token: generateAccessToken(String(user.id)),
      user: user.id,
    });
  } catch (error) {
    return res.json({
      message: "Error logging in.",
      error: error,
    });
  }
};

const generateAccessToken = (userId: string) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
  return jwt.sign({ userId }, secret);
};

