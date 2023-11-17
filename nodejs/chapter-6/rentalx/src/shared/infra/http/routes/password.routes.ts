import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import {SendForgotPasswordEmailController} from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController"
import { Router } from "express"


const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordEmailController();
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forgot-password", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset-password", resetPasswordUserController.handle)

export { passwordRoutes }
