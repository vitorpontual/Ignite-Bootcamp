import {Request, Response} from "express";
import {container} from "tsyringe";
import {SendForgotPasswordEmailUseCase} from "./SendForgotPasswordEmailUseCase";


export class SendForgotPasswordEmailController {

   async handle(request: Request, response: Response): Promise<Response> {
      const { email } = request.body
      
      const sendForgotPasswordEmailUseCase = container.resolve(SendForgotPasswordEmailUseCase)

      await sendForgotPasswordEmailUseCase.execute(email)

      return response.send()
   }
}
