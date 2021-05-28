import { injectable } from "tsyringe";
import { User } from "../schemas/User";
import { ICreateUserDTO } from "./DTO/ICreateUserDTO";

@injectable()
export class CreateUserService {
  async execute({email, socket_id, avatar, name}: ICreateUserDTO){

    const userAlreadyExists = await User.findOne({email}).exec();

    if(userAlreadyExists){
      const user = await User.findOneAndUpdate({
        _id: userAlreadyExists._id
      },
      {
        $set: {socket_id, avatar, name}
      },
      {
        new: true // update data
      });

      return user;
    }else{
      const user = await User.create({
        email,
        socket_id,
        avatar,
        name
      })
      return user;
    }
  }
}