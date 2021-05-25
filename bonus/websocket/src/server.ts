import { server } from "./app";
import "./websocket/ChatService"

server.listen(3000, () => console.log("server is running"))