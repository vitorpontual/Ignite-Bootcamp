import { container } from "tsyringe";
import { io } from "../app";
import { CreateChatRoomService } from "../services/CreateChatRoomService";
import { CreateMessageService } from "../services/CreateMessageService";

import { CreateUserService } from "../services/CreateUserServices";
import { GetAllUsersSerivce } from "../services/GetAllUsersService";
import { GetChatRoomByIdService } from "../services/GetChatRoomById";
import { GetChatRoomByUsersService } from "../services/GetChatRoomByUsersService.ts";
import { GetMessageByChatRoomService } from "../services/GetMessagesByChatRoomService";
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

    const getChatRoomByUsersService = container.resolve(GetChatRoomByUsersService)

    const getUserBySocketItService = container.resolve(GetUserBySocketId);

    const getMessageByChatRoomService = container.resolve(GetMessageByChatRoomService)

    const userLogged = await getUserBySocketItService.execute(socket.id)

    let room = await getChatRoomByUsersService.execute([data.idUser, userLogged._id])

    if(!room){
      room = await createChatRoomService.execute([data.idUser, userLogged._id,])
    }

    socket.join(room.chat_room_id);

    // Buscar messagens da sala
    const messages = await getMessageByChatRoomService.execute(room.chat_room_id)

    callback({room, messages})
  })

  socket.on("message", async (data) => {
    // Buscar as informações do usúario (socket.id)
    const getUserBySocketIdService = container.resolve(GetUserBySocketId)

    const createMessageService = container.resolve(CreateMessageService)

    const getChatRoomById = container.resolve(GetChatRoomByIdService)

    const user = await getUserBySocketIdService.execute(socket.id)

    // Salvar a mensagem
    const message = await createMessageService.execute({
      to: user._id,
      text: data.message,
      roomId: data.idChatRoom
    })

    console.log(message)

    // Enviar a mensagem para outros usuários da sala
    io.to(data.idChatRoom).emit("message", {
      message,
      user,
    });
  
    // Enviar notificação para o usuário correto
    const room = await getChatRoomById.execute(data.idChatRoom)
    
    const userFrom = room.user_id.find( response => String(response._id) != String(user._id))


    io.to(userFrom.socket_id).emit("notification", {
      newMessage: true,
      roomId: data.idChatRoom,
      from: user
    })


  });

});