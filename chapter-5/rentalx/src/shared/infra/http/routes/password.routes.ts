import {SendForgotPasswordEmailController} from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController"
import { Router } from "express"


const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordEmailController();

passwordRoutes.post("/forgot-password", sendForgotPasswordMailController.handle)

export { passwordRoutes }
