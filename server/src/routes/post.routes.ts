import express from "express";
import {
  createPost,
  deletePost,
  ensureAuthenticated,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.post("/api/posts", ensureAuthenticated, createPost);
postRouter.get("/api/posts", getPosts);

postRouter.put("/api/posts/:id", ensureAuthenticated, updatePost);
postRouter.get("/api/posts/:id", getPostById);
postRouter.delete("/api/posts/:id", ensureAuthenticated, deletePost);

export default postRouter;
