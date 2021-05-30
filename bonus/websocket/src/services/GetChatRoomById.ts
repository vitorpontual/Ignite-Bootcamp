import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";

@injectable()
export class GetChatRoomByIdService {

  async execute(idChatRoom: string){
    const room = await ChatRoom.findOne({
      chat_room_id: idChatRoom
    }).populate("user_id").exec()

    return room
  }
}