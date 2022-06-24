import { Router } from 'express';
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/authenticateUser.controller';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/refreshToken.controller';


const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post('/sessions', authenticateUserController.handle);
authRoutes.post('/refresh-token', refreshTokenController.handle);

export { authRoutes };