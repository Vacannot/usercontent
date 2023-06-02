import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';

export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find().select('_id username __v isAdmin');
  res.status(200).json(users);
}

export async function registerUser(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) {
    const missingFields = [];

    if (!username) {
      missingFields.push('"username"');
    }

    if (!password) {
      missingFields.push('"password"');
    }

    res.setHeader('Content-Type', 'application/json');
    return res
      .status(400)
      .json(`Missing required fields: ${missingFields.join(', ')}`);
  }

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json('Username already taken');
  }

  const user = new UserModel({
    username,
    password,
  });

  await user.save();

  return res.status(201).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  // Check if user exists
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(401).json('Invalid username or password');
  }
  // Verify password
  const passwordMatch = await argon2.verify(user.password, password);

  if (!passwordMatch) {
    return res.status(401).json('Invalid username or password');
  }

  // Set session data
  req.session!.user = {
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  // Send response
  res.status(200).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
}

export function checkAuth(req: Request, res: Response) {
  if (req.session && req.session.user) {
    res.status(200).json({ success: true, user: req.session.user });
  } else {
    res.status(204).json({ success: false });
  }
}

export function logoutUser(req: Request, res: Response) {
  req.session = null;

  return res.status(204).json('Logged out successfully');
}

export async function updateUserRole(req: Request, res: Response) {
  const userId = req.params.id;
  const { isAdmin } = req.body;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json('User not found');
  }
  user.isAdmin = isAdmin;
  await user.save();
  return res.status(200).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
}

export async function deleteUser(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json('User not found');
  }

  await user.remove();

  return res.status(204).send();
}
