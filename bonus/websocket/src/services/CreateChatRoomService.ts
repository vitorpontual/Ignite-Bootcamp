import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";


@injectable()
export class CreateChatRoomService {

  async execute(user_id: string[]){
    const room = await ChatRoom.create({
      user_id
    })

    return room;
  }
}