import { container } from "tsyringe";
import { io } from "../app";
import { CreateChatRoomService } from "../services/CreateChatRoomService";

import { CreateUserService } from "../services/CreateUserServices";
import { GetAllUsersSerivce } from "../services/GetAllUsersService";
import { GetUserBySocketId } from "../services/GetUserBySocketId";


io.on("connect", socket => {

  socket.on("start", async (data) => {

    const { email, avatar, name } = data
    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({ email, avatar, name, socket_id: socket.id })


  });

  socket.on("get_users", async (callback) => {
    const getAllUsersServiec = container.resolve(GetAllUsersSerivce)

    const users = await getAllUsersServiec.execute();

    callback(users);

  })

  socket.on("start_chat", async (data, callback) => {
    const createChatRoomService = container.resolve(CreateChatRoomService)

    const getUserBySocketItService = container.resolve(GetUserBySocketId);

    const userLogged = await getUserBySocketItService.execute(socket.id)
    
    const room = await createChatRoomService.execute([data.idUser, userLogged._id,])


    callback({room})
  })

});