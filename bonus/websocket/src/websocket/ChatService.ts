import { io } from "../app";


io.on("connect", socket => {

  socket.emit("chat_iniciado", {
    message: "Seu chat foi iniciado"
  })
})