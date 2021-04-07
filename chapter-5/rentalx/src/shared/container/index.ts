import { container } from "tsyringe";

import  "@shared/container/providers"

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";

import { ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository} from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {UsersTokensRepository} from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoryRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
  SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
   "UsersTokensRepository",
   UsersTokensRepository
)
