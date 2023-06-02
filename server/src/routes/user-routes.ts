import { Router } from "express";
import {
  checkAuth,
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUserRole,
} from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/api/users", getAllUsers);

userRouter.post("/api/users/register", registerUser);
userRouter.post("/api/users/login", loginUser);
userRouter.post("/api/users/logout", logoutUser);
userRouter.get("/api/users/auth", checkAuth);

userRouter.put("/api/users/:id", updateUserRole);
userRouter.delete("/api/users/:id", deleteUser);

export default userRouter;
