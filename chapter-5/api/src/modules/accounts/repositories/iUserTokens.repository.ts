import { ICreateUserTokenDTO } from "../dtos/iCreateUserToken.dto";
import { UserTokens } from "../infra/typeorm/entities/userTokens";

interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUserTokensRepository };