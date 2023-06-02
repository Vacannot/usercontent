import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import postRouter from './routes/post-routes';
import userRouter from './routes/user-routes';

export const app = express();

// Global middlewares
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    secret: 'asdkhl847sglkj374hj39sglk5j7',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false,
    httpOnly: true,
  })
);

// Routers:
app.use(postRouter);
app.use(userRouter);

// Global felhantering:
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});
