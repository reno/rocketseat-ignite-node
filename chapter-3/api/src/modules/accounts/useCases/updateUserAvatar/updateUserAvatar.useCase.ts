import { inject } from "tsyringe";
import { UsersRepository } from "../../repositories/users.repository";
import { deleteFile } from '../../../../utils/file'

interface IRequest {
  userId: string,
  avatarFile: string
}

class UpdateUserAvatarUseCase { 

  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute({ userId, avatarFile}: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatarFile;
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };