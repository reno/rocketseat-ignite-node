import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const alreadyExists = this.usersRepository.findByEmail(email);
    if (alreadyExists) {
      throw new Error('Email already registered');
    }
    return this.usersRepository.create({ email, name });
  }
}

export { CreateUserUseCase };
