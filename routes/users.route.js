import express from 'express';
import { _UsersControllers } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { UserRole } from '../utils/enums/userRole.enum.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { updateUserValidationReqSchema } from '../validations/users/updateUserRequest.js';
export const userRouter = express.Router();

userRouter.use('/',authMiddleware);
userRouter.route('/')
        .get(_UsersControllers.index);

userRouter.route('/:id')
        .get(_UsersControllers.show)
        .patch
        (
                updateUserValidationReqSchema,
                handleValidateErrorReq,      
                _UsersControllers.update
        )
        .delete
        (
                permissionsMiddleware(UserRole.ADMIN),
                _UsersControllers.destroy
        );
