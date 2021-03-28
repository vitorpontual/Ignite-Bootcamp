import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id:  string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepositroy: IUsersRepository
  ){}

  async execute({user_id, avatar_file}: IRequest): Promise<void>{
    const user = await this.usersRepositroy.findById(user_id);
    
    user.avatar = avatar_file;

    const test = await this.usersRepositroy.create(user);
    console.log(test)
  }
}

export { UpdateUserAvatarUseCase }