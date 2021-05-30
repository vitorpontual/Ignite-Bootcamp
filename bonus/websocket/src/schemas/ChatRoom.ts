import mongoose, { Document, Schema } from "mongoose";
import { User } from "./User";
import { v4 as uuid } from "uuid"

type ChatRoom = Document & {
  user_id: User[];
  chat_room_id: string;
}

const ChatRoomSchema = new Schema({
  user_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  chat_room_id: {
    type: String,
    default: uuid,
  }
});

const ChatRoom = mongoose.model<ChatRoom>("ChatRoom", ChatRoomSchema);

export { ChatRoom}