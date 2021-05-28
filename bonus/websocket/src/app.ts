import "reflect-metadata";
import express from "express"
import path from "path";
import { createServer } from "http"
import { Server } from 'socket.io';
import "dotenv/config"

import "./database/db"

const app = express()

const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "..", "public")))

io.on("connection", (socket) => {
  console.log("Socket", socket.id)
})



export { server, io}