import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
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
    private usersRepositroy: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ){}

  async execute({user_id, avatar_file}: IRequest): Promise<void>{
    const user = await this.usersRepositroy.findById(user_id);

    
    if(user.avatar){
      await this.storageProvider.delete(user.avatar, "avatar")
    };
    
    await this.storageProvider.save(avatar_file, "avatar")
    user.avatar = avatar_file;

    const test = await this.usersRepositroy.create(user);
  }
}

export { UpdateUserAvatarUseCase }