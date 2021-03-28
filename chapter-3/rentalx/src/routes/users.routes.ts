import { Router } from "express";
import multer from "multer"; 

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";


const userRoutes = Router();

const upload = multer({
  dest: "./avatar"
})

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle)

userRoutes.patch("/avatar", upload.single("file"), updateUserAvatarController.handle)


export { userRoutes }