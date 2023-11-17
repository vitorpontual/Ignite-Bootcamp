import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";



let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepoistoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepoistoryInMemory = new UsersTokensRepositoryInMemory();
    sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(usersRepositoryInMemory, usersTokensRepoistoryInMemory, dateProvider, mailProvider )
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail")
    await usersRepositoryInMemory.create({
      driver_license: "xxx-1234",
      email: "test@test.com",
      name: "Azevedo Blanch",
      password: "1111"
    });
  
    await sendForgotPasswordEmailUseCase.execute("test@test.com");

    expect(sendMail).toHaveBeenCalled();

  });

  it("should not be able to send a email if user does not exists", async () => {
    await expect(
      sendForgotPasswordEmailUseCase.execute("test@123.com")
    ).rejects.toEqual(new AppError("User does not exists!"))
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = spyOn(usersTokensRepoistoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "xxx-1234",
      email: "test@test.com",
      name: "Azevedo Blanch",
      password: "1111"
    });
  
    await sendForgotPasswordEmailUseCase.execute("test@test.com");

    expect(generateTokenMail).toHaveBeenCalled();
  })
})