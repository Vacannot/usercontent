import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { PostModel } from '../models/post-model';

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) {
    res.status(401).json('Unauthorized');
  } else {
    next();
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.session!.user._id;
  const post = await PostModel.findById(postId);

  if (!post) {
    return res.status(404).json(`Post with ID ${postId} not found`);
  }

  if (
    post.author.toString() !== userId.toString() &&
    !req.session?.user.isAdmin
  ) {
    return res
      .status(403)
      .json(`You do not have permission to update this post`);
  }

  // Validate input
  const schema = Joi.object({
    title: Joi.string().trim().min(2).required(),
    content: Joi.string().trim().min(5).required(),
    author: Joi.string().trim().required(),
    createdAt: Joi.string().trim().min(5).required(),
    updatedAt: Joi.string().trim().min(5).required(),
  });

  const { _id, ...requestBody } = req.body;

  const { error } = schema.validate(requestBody);
  if (error) {
    return res.status(400).json(error.message);
  }
  const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.session!.user._id;

  const post = await PostModel.findById(postId);
  if (!post) {
    return res.status(404).json(`Post with ID ${postId} not found`);
  }

  if (
    post.author.toString() !== userId.toString() &&
    !req.session?.user.isAdmin
  ) {
    return res
      .status(403)
      .json(`You do not have permission to delete this post`);
  }

  await post.delete();

  res.status(204).end();
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const author = req.session!.user._id;

  // Validate input
  const schema = Joi.object({
    title: Joi.string().trim().min(2).required(),
    content: Joi.string().trim().min(5).required(),
  });

  const { error } = schema.validate({ title, content });
  if (error) {
    return res.status(400).json(error.message);
  }

  const newPost = new PostModel({
    title,
    content,
    author,
  });

  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await PostModel.find().populate('author', 'username -_id');
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await PostModel.findById(postId).populate(
    'author',
    'username -_id'
  );
  if (!post) {
    return res.status(404).json(`Post with ID ${postId} not found`);
  }
  res.json(post);
};
