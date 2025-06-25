import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authControllers";

const usersRouter = Router()

usersRouter.post("/register", registerUser)
usersRouter.post("/login", loginUser)

export { usersRouter }

