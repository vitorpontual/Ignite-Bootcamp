import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";
import { ICreateMessageDTO } from "./DTO/ICreateMessageDTO";

@injectable()
export class CreateMessageService {


  async execute({text, to, roomId}: ICreateMessageDTO){

    const message = await Message.create({
      to, text, roomId
    });

    return message;
  }
}