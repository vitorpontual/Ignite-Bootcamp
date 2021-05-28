import { injectable } from "tsyringe";
import { User } from "../schemas/User";

@injectable()
export class GetAllUsersSerivce {
  async execute(){
    const users = await User.find();
    return users;
  }
}