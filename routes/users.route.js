import express from 'express';
import { _UsersControllers } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { updateUserValidationReqSchema } from '../validations/users/updateUserRequest.js';
import { User } from '../models/User.model.js';
export const userRouter = express.Router();
const modelName = User.modelName;

userRouter.use('/',authMiddleware);
userRouter.route('/')
        .get(
                permissionsMiddleware(modelName),
                _UsersControllers.index
        );

userRouter.route('/:id')
        .get(
                permissionsMiddleware(modelName),
                _UsersControllers.show
        )
        .patch
        (
                permissionsMiddleware(modelName),
                updateUserValidationReqSchema,
                handleValidateErrorReq,      
                _UsersControllers.update
        )
        .delete
        (
                permissionsMiddleware(modelName),
                _UsersControllers.destroy
        );
