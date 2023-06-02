import express from 'express';
import {
  createPost,
  deletePost,
  ensureAuthenticated,
  getPostById,
  getPosts,
  updatePost,
} from '../controllers/post-controller';

const postRouter = express.Router();

postRouter.put('/api/posts/:id', ensureAuthenticated, updatePost);
postRouter.delete('/api/posts/:id', ensureAuthenticated, deletePost);
postRouter.post('/api/posts', ensureAuthenticated, createPost);
postRouter.get('/api/posts', getPosts);
postRouter.get('/api/posts/:id', getPostById);

export default postRouter;
