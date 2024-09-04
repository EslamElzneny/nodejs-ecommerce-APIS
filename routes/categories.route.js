import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { UserRole } from '../utils/enums/userRole.enum.js';
import { _CategoryControllers } from '../controllers/categories.controller.js';
import { createCategoryValidationReqSchema } from '../validations/categories/createCategoryRequest.js';
import { updateCategoryValidationReqSchema } from '../validations/categories/updateCategoryRequest.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
export const categoryRouter = express.Router();

categoryRouter.route('/')
        .get(_CategoryControllers.index)
        .post(
                createCategoryValidationReqSchema,
                handleValidateErrorReq,
                _CategoryControllers.checkCreatedCategoryIsNotExist,
                _CategoryControllers.store
        );

categoryRouter.route('/:id')
        .get(_CategoryControllers.show)
        .patch(
                authMiddleware,
                // permissionsMiddleware(UserRole.ADMIN),
                updateCategoryValidationReqSchema,
                handleValidateErrorReq,
                _CategoryControllers.checkUpdatedCategoryIsNotExist,
                _CategoryControllers.update
        )
        .delete(
                authMiddleware,
                // permissionsMiddleware(UserRole.ADMIN),
                _CategoryControllers.destroy
        );
