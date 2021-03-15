import express, { response } from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({message: "alo mundo"})
})

app.listen(5555, () => console.log("Server is running!"))