import { NextFunction, Request, Response } from "express";

export const ensureAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) {
    res.status(500).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
