import {ICreateUserTokenDTO} from "@modules/accounts/dtos/ICreateUserTokenDTO";
import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {getRepository, Repository} from "typeorm";
import {UsersTokens} from "../entities/UsersTokens";


export class UsersTokensRepository implements IUsersTokensRepository{
   
   private repository: Repository<UsersTokens>

   constructor(){
      this.repository = getRepository(UsersTokens);
   }
   

   async create(data: ICreateUserTokenDTO): Promise<UsersTokens> {
      const userToken = this.repository.create(data)

      await this.repository.save(userToken)

      return userToken
   }

   async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
      const usersTokens = await this.repository.findOne({
	 user_id,
	 refresh_token
      });

      return usersTokens;
   }

   async deleteById(id: string): Promise<void> {
      await this.repository.delete(id)
   }

   async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
      const userToken = await this.repository.findOne({refresh_token})

      return userToken
   }
   


}
