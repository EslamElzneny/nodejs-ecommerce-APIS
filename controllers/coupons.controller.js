import { Coupon } from "../models/Coupon.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";

const _db = new HandlersFactory(Coupon);


class CouponsControllers {
    constructor(){
    }

    index = _db.getAllByPaginate;

    store = _db.createOne;

    show = _db.getOne;

    update = _db.updateOne;
    
    destroy = _db.deleteOne;
}

export const _CouponsControllers = new CouponsControllers;
