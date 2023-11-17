import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {IRentalsRepository} from "@modules/rentals/repositories/IRentalRepository";
import {inject, injectable} from "tsyringe";

@injectable()
export class ListUserRentalUseCase {
   constructor(
      @inject("RentalsRepository")
      private rentalsRepository: IRentalsRepository
   ){};

   async execute(user_id: string): Promise<Rental[]> {
      const rentals = await this.rentalsRepository.findByUser(user_id);
      console.log(rentals)

      return rentals
      
   }
} 
