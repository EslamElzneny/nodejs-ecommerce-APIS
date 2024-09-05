import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { _CartControllers } from '../controllers/cart.controller.js';
import { createCartValidationReqSchema } from '../validations/carts/createCartRequest.js';
import { updateCartValidationReqSchema } from '../validations/carts/updateCartRequest.js';
export const cartRouter = express.Router();

cartRouter.use(authMiddleware);
cartRouter.route('/')
        .get(_CartControllers.index)
        .post(
                createCartValidationReqSchema,
                handleValidateErrorReq,
                _CartControllers.addToCart
        );

cartRouter.route('/empty').delete(_CartControllers.clearCart);
cartRouter.route('/:itemId')
        .patch(
                updateCartValidationReqSchema,
                handleValidateErrorReq,
                _CartControllers.updateCartItemQuantity
        )
        .delete(
                _CartControllers.removeSpecificCartItem
        );

