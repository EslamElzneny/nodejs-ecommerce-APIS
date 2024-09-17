import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { _ProductControllers } from '../controllers/products.controller.js';
import { createProductValidationReqSchema } from '../validations/products/createProductRequest.js';
import { updateProductValidationReqSchema } from '../validations/products/updateProductRequest.js';
import { Product } from '../models/Product.model.js';
export const productRouter = express.Router();

const modelName = Product.modelName;

productRouter.route('/')
        .get(_ProductControllers.index)
        .post(
                authMiddleware,
                permissionsMiddleware(modelName),
                createProductValidationReqSchema,
                handleValidateErrorReq,
                _ProductControllers.checkCreatedProductIsNotExist,
                _ProductControllers.store
        );

productRouter.route('/:id')
        .get(_ProductControllers.show)
        .patch(
                authMiddleware,
                permissionsMiddleware(modelName),
                updateProductValidationReqSchema,
                handleValidateErrorReq,
                _ProductControllers.checkUpdatedProductIsNotExist,
                _ProductControllers.update
        )
        .delete(
                authMiddleware,
                permissionsMiddleware(modelName),
                _ProductControllers.destroy
        );
