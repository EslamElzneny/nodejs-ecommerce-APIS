import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { _WishlistControllers } from '../controllers/wishlist.controller.js';
import { createWishlistValidationReqSchema } from '../validations/wishlist/createCategoryRequest.js';
export const wishlistRouter = express.Router();

wishlistRouter.use(authMiddleware);
wishlistRouter.route('/')
        .get(_WishlistControllers.filterWishlistForLoggedUser,_WishlistControllers.index)
        .post(
                createWishlistValidationReqSchema,
                handleValidateErrorReq,
                _WishlistControllers.checkCreatedWishlistIsNotExist,
                _WishlistControllers.store
        );

wishlistRouter.route('/:id')
        .delete(_WishlistControllers.destroy);
