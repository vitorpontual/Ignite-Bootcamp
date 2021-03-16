import { Router } from "express";
import { v4 as uuid } from "uuid"
import { Category } from "../model/Category";
import { CategoriesRepository } from "./repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExistis = categoriesRepository.findByName(name);


  if(categoryAlreadyExistis){
    return res.status(400).json({ error: "Category already exists"});
  }

  categoriesRepository.create({
    name,
    description
  });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const categoires = categoriesRepository.findAll();

  return res.json({ categoires });
})

export { categoriesRoutes }