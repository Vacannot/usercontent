import { Request, Response } from "express";
import Joi from "joi";
import { PostModel } from "../models/post-model";

const hasPermission = (post: any, userId: string, isAdmin: boolean) => {
  return post.author.toString() === userId || isAdmin;
};

const validateSchema = (schema: any, payload: any, res: Response) => {
  const { error } = schema.validate(payload);
  if (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const postSchema = Joi.object({
  title: Joi.string().trim().min(2).required(),
  content: Joi.string().trim().min(5).required(),
});

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const author = req.session!.user._id;

  try {
    validateSchema(postSchema, { title, content }, res);

    const newPost = new PostModel({
      title,
      content,
      author,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  const { user } = req.session!;

  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json(`Post with ID ${postId} not found`);
    }

    if (!hasPermission(post, user._id, user.isAdmin)) {
      return res.status(403).json(`You lack permission to update this post`);
    }

    const { _id, ...requestBody } = req.body;

    validateSchema(postSchema, requestBody, res);

    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  const { user } = req.session!;

  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      throw { status: 404, message: `Post with ID ${postId} not found` };
    }

    if (!hasPermission(post, user._id, user.isAdmin)) {
      throw {
        status: 403,
        message: `You lack not have permission to delete this post`,
      };
    }

    await post.delete();
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await PostModel.find().populate("author", "username -_id");
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const { id: postId } = req.params;

  try {
    const post = await PostModel.findById(postId).populate(
      "author",
      "username -_id"
    );
    if (!post) {
      throw { status: 404, message: `Post with ID ${postId} not found` };
    }
    res.json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
