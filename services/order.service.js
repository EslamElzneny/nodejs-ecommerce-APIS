import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { Cart } from "../models/Cart.model.js";
import { Order } from "../models/Order.model.js";
import { Product } from "../models/Product.model.js";
import { _AppError } from "../utils/appError.js";
import { UserRole } from "../utils/enums/userRole.enum.js";
import { httpResp } from "../utils/httpResponse.js";
import { httpStatus } from "../utils/httpStatus.js";

class OrderService {
    constructor(){}

    createCashOrder = asyncWrapper(
        async (req,res,next) => {

            // app settings
            const taxPrice = 0;
            const shippingPrice = 0;
            
            // 1) Get cart depend on cartId
            const cart = await Cart.findById(req.params.cartId);
            if (!cart) {
                const error = _AppError.create(`There is no such cart with id ${req.params.cartId}`,404,httpStatus.FAIL)
                return next(error);
            }
            
            // 2) Get order price depend on cart price "Check if coupon apply"
            const cartPrice = cart.totalPriceAfterDiscount
                ? cart.totalPriceAfterDiscount
                : cart.totalCartPrice;
            
            const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
            
            // 3) Create order with default paymentMethodType cash
            const order = await Order.create({
                user: req.user._id,
                cartItems: cart.cartItems,
                shippingAddress: req.body.shipping_address_id,
                totalOrderPrice,
                taxPrice,
                shippingPrice
            });
            
            // 4) After creating order, decrement product quantity, increment product sold
            if (order) {
                const bulkOption = cart.cartItems.map((item) => ({
                    updateOne: {
                        filter: { _id: item.product },
                        update: { $inc: { quantity: -item.quantity } },
                    },
                }));
                await Product.bulkWrite(bulkOption, {});
            
                // 5) Clear cart depend on cartId
                await Cart.findByIdAndDelete(req.params.cartId);
            }
            
            return res.status(201).json(httpResp.success(order))

        }
    );

    filterOrderForLoggedUser = asyncWrapper(
        async (req,res,next) => {
            if (req.user.role === UserRole.USER) req.filterObj = { user: req.user._id };
            next();
        }
    );

    updateOrderStatus = asyncWrapper(
        async (req,res,next) => {
            const { status } = req.body;
            const order = await Order.findOne({_id:req.params.id});

            if(!order){
                return next(_AppError.create(`There is no such a order with this id:${req.params.id}`,404,httpStatus.FAIL))
            }
            
            order.status = status;

            await order.save();

            return res.status(200).json(httpResp.success(order))

        }
    );

    updateOrderToPaid = asyncWrapper(
        async (req,res,next) => {
            const order = await Order.findOne({_id:req.params.id});

            if(!order){
                return next(_AppError.create(`There is no such a order with this id:${req.params.id}`,404,httpStatus.FAIL))
            }

            if(order.isPaid){
                return next(_AppError.create(`User is already paid `,200,httpStatus.SUCCESS))
            }

            order.isPaid = true;
            order.paidAt = Date.now();

            await order.save();

            return res.status(200).json(httpResp.success(order))

        }
    );

}

export const _OrderService = new OrderService;
