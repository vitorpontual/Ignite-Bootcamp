import {response, Router} from "express"; 
import { Specification } from "../modules/cars/model/Specification";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationRoutes.post("/", (req, res) => {

  const { name, description} = req.body

  const createSpecificationService = new CreateSpecificationService(specificationRepository) 

  createSpecificationService.execute({
    name, description
  })

  return res.status(201).send()
})

specificationRoutes.get("/", (req, res) => {
  const specification = specificationRepository.findAll()
  
  return res.json({specification})
})

export { specificationRoutes }