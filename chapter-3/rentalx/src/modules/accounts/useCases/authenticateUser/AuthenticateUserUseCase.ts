import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import {sign } from "jsonwebtoken"

import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute ({email, password}: IRequest): Promise<IResponse>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError("Email or Password incorrect")
    }
    
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new AppError("Email or Password incorrect")
    }

    const token = sign({}, "8e4de39369ccb3045108942bc729a67a", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      user: {
        email: user.email,
        name: user.name
      },
      token
    }

    return tokenReturn


  }


}

export { AuthenticateUserUseCase }