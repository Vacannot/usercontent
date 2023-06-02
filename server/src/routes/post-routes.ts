import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post-controller";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const postRouter = express.Router();

postRouter.post("/api/posts", ensureAuthentication, createPost);
postRouter.get("/api/posts", getPosts);

postRouter.put("/api/posts/:id", ensureAuthentication, updatePost);
postRouter.get("/api/posts/:id", getPostById);
postRouter.delete("/api/posts/:id", ensureAuthentication, deletePost);

export default postRouter;
