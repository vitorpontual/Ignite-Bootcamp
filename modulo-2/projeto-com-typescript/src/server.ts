import express, { response } from "express";

import {routes} from "./routes/index"

const app = express();

app.use(express.json());
app.use(routes)

app.get("/", (req, res) => {
  return res.json({message: "alo mundo"})
});

app.post("/courses", (req, res) => {
  const { name } = req.body;
  return res.json({name});
});

app.listen(5555, () => console.log("Server is running!"))