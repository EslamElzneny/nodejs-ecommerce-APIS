import express from 'express';
import { _UsersControllers } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { UserRole } from '../utils/enums/userRole.enum.js';
export const userRouter = express.Router();

userRouter.use('/',authMiddleware);
userRouter.route('/')
        .get(_UsersControllers.index);

userRouter.route('/users/:id')
                .get(_UsersControllers.show)
                .patch(_UsersControllers.update)
                .delete(permissionsMiddleware(UserRole.ADMIN),_UsersControllers.destroy);
