import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalRepository";


class RentalRepositoryInMemory implements IRentalsRepository {
  
  rentals: Rental[] = [];
  
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      ...data,
      start_date: new Date(),
      created_at: new Date()
    })

    this.rentals.push(rental)

    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
  }
  async findById(id: string): Promise<Rental> {
     return this.rentals.find(rental => rental.id === id)

  }
  async findByUser(id: string): Promise<Rental[]> {
     return this.rentals.filter(rental => rental.user_id === id)
  }

}

export { RentalRepositoryInMemory }
