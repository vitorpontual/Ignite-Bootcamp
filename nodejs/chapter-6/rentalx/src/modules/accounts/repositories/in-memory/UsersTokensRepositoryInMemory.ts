import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

  usersTokens: UsersTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, data)

    this.usersTokens.push(userToken)

    return userToken
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token )
    return userToken
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(ut => ut.id === id);

    this.usersTokens.splice(
      this.usersTokens.indexOf(userToken)
    )
  }
  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token)
    return userToken
  }

}