import {Request, Response} from "express";
import {container} from "tsyringe";
import {ListUserRentalUseCase} from "./ListUserUseCase";



export class ListUserRentalController {
   async handle(request: Request, response: Response): Promise<Response> {
      const { id } = request.user
      console.log(id)

      const listUserRentalUseCase = container.resolve(ListUserRentalUseCase);
     
      const rental = await listUserRentalUseCase.execute(id);
      console.log(rental)

      return response.json(rental)

   }
}
