import { ObjectId } from "mongoose";
import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";


@injectable()
export class GetChatRoomByUsersService {
  async execute(user_id: ObjectId[]){
    const room = await ChatRoom.findOne({
      user_id: {
        $all: user_id
      }
    }).exec();

    return room
  }
}