import { Order } from "../models/Order.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";
import { _OrderService } from "../services/order.service.js";

const _db = new HandlersFactory(Order);
class OrderControllers {
    constructor(){
    }

    index = _db.getAllByPaginate;

    show = _db.getOne;

    addOrder = _OrderService.createCashOrder;

    updateOrderStatus = _OrderService.updateOrderStatus;

    updateOrderToPaid = _OrderService.updateOrderToPaid;

}

export const _OrderControllers = new OrderControllers;
