import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        id: user_id
      },
      relations: [ 
        'games'
      ]
    })
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query(`SELECT * FROM users ORDER BY first_name ASC`); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.createQueryBuilder('user')
      .where('user.first_name ilike :first_name', { first_name:`%${first_name}%` })
      .andWhere('user.last_name ilike :last_name', { last_name:`%${last_name}%` })
      .getMany()
  }
}
