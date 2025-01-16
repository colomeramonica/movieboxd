import { User } from "../models/user";

export const createAccount = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.json({
      message: "Unable to create account.",
      error: error.original,
  });
  }
}

export const editProfile = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, { where: { id: req.params.userId } });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.json({
      message: "Unable to update the user.",
      error: error.original,
    });
  }
}

export const getProfile = async (req, res) => { 
  try {
    const user = await User.findByPk(req.params.userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.json({
      message: "User not found.",
      error: error.original,
    });
  }
};