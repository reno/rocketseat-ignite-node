import { Router } from 'express';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMail.controller';
//import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPassword/resetPassword.controller';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
//const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
//passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };