import express, { response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({message: "alo mundo"})
});

app.post("/courses", (req, res) => {
  const { name } = req.body;
  return res.json({name});
});

app.listen(5555, () => console.log("Server is running!"))