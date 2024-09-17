import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { Coupon } from '../models/Coupon.model.js';
import { _CouponsControllers } from '../controllers/coupons.controller.js';
import { createCouponValidationReqSchema } from '../validations/coupons/createCouponRequest.js';
import { updateCouponValidationReqSchema } from '../validations/coupons/updateCouponRequest.js';
export const couponRouter = express.Router();
const modelName = Coupon.modelName;

couponRouter.use(authMiddleware);
couponRouter.route('/')
        .get(permissionsMiddleware(modelName),_CouponsControllers.index)
        .post(
                permissionsMiddleware(modelName),
                createCouponValidationReqSchema,
                handleValidateErrorReq,
                _CouponsControllers.store
        );

couponRouter.route('/:id')
        .get(permissionsMiddleware(modelName),_CouponsControllers.show)
        .patch(
                permissionsMiddleware(modelName),
                updateCouponValidationReqSchema,
                handleValidateErrorReq,
                _CouponsControllers.update
        )
        .delete(
                permissionsMiddleware(modelName),
                _CouponsControllers.destroy
        );
