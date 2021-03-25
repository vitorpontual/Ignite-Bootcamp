import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/authenticateUser/AuthenticateUserController";

const autheticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController()

autheticateRoutes.post("/sessions", authenticateUserController.handle)

export { autheticateRoutes }