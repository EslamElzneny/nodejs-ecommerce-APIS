import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { UserRole } from '../utils/enums/userRole.enum.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { _ProductControllers } from '../controllers/products.controller.js';
import { createProductValidationReqSchema } from '../validations/products/createProductRequest.js';
import { updateProductValidationReqSchema } from '../validations/products/updateProductRequest.js';
export const productRouter = express.Router();

productRouter.route('/')
        .get(_ProductControllers.index)
        .post(
                createProductValidationReqSchema,
                handleValidateErrorReq,
                _ProductControllers.checkCreatedProductIsNotExist,
                _ProductControllers.store
        );

productRouter.route('/:id')
        .get(_ProductControllers.show)
        .patch(
                authMiddleware,
                // permissionsMiddleware(UserRole.ADMIN),
                updateProductValidationReqSchema,
                handleValidateErrorReq,
                _ProductControllers.checkUpdatedProductIsNotExist,
                _ProductControllers.update
        )
        .delete(
                authMiddleware,
                // permissionsMiddleware(UserRole.ADMIN),
                _ProductControllers.destroy
        );
