import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import postRouter from "./routes/post-routes";
import userRouter from "./routes/user-routes";
import dotenv from "dotenv";

export const app = express();

dotenv.config();

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
  })
);

app.use(postRouter);
app.use(userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});
