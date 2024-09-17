import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { _CartControllers } from '../controllers/cart.controller.js';
import { createOrderValidationReqSchema } from '../validations/orders/createOrderRequest.js';
import { _OrderControllers } from '../controllers/order.controller.js';
import { _OrderService } from '../services/order.service.js';
import { updateStatusOrderValidationReqSchema } from '../validations/orders/updateOrderRequest.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { Order } from '../models/Order.model.js';
export const orderRouter = express.Router();
const modelName = Order.modelName;

orderRouter.use(authMiddleware);
orderRouter.route('/').get(_OrderControllers.index);
orderRouter.route('/:cartId').post(
        createOrderValidationReqSchema,
        handleValidateErrorReq,
        _OrderService.filterOrderForLoggedUser,
        _OrderControllers.addOrder
);

orderRouter.route('/:id').get(_OrderControllers.show);
orderRouter.route('/:id/updateStatus').patch(
        permissionsMiddleware(modelName),
        updateStatusOrderValidationReqSchema,
        handleValidateErrorReq,
        _OrderControllers.updateOrderStatus
);
orderRouter.route('/:id/paid').patch(permissionsMiddleware(modelName),_OrderControllers.updateOrderToPaid);
        // .delete(
        //         _CartControllers.removeSpecificCartItem
        // );

