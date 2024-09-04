import express from 'express';
import { _AuthController } from '../controllers/authentication.controller.js';
import { _ValidService } from '../services/validations.service.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { registerValidationReqSchema } from '../validations/authentication/registerRequest.js';
import { loginValidationReqSchema } from '../validations/authentication/loginRequest.js';
export const authRouter = express.Router();

authRouter.route('/register')
    .post(
        registerValidationReqSchema,
        handleValidateErrorReq,
        _AuthController.register
    );

authRouter.route('/login')
    .post(
        loginValidationReqSchema,
        handleValidateErrorReq,
        _AuthController.login
    );
