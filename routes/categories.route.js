import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { _CategoryControllers } from '../controllers/categories.controller.js';
import { createCategoryValidationReqSchema } from '../validations/categories/createCategoryRequest.js';
import { updateCategoryValidationReqSchema } from '../validations/categories/updateCategoryRequest.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { Category } from '../models/Category.model.js';
export const categoryRouter = express.Router();
const modelName = Category.modelName;

categoryRouter.route('/')
        .get(_CategoryControllers.index)
        .post(
                authMiddleware,
                permissionsMiddleware(modelName),
                createCategoryValidationReqSchema,
                handleValidateErrorReq,
                _CategoryControllers.checkCreatedCategoryIsNotExist,
                _CategoryControllers.store
        );

categoryRouter.route('/:id')
        .get(_CategoryControllers.show)
        .patch(
                authMiddleware,
                permissionsMiddleware(modelName),
                updateCategoryValidationReqSchema,
                handleValidateErrorReq,
                _CategoryControllers.checkUpdatedCategoryIsNotExist,
                _CategoryControllers.update
        )
        .delete(
                authMiddleware,
                permissionsMiddleware(modelName),
                _CategoryControllers.destroy
        );
