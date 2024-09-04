import { Address } from "../models/address.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";

const _db = new HandlersFactory(Address);

class AddressesControllers {
    constructor(){
    }
    index = _db.getAllByPaginate;

    store = _db.createOne;

    show = _db.getOne;

    update = _db.updateOne;
    
    destroy = _db.deleteOne;

    setRequest = (req,res,next) => {
        req._query_obj = { // for get request
            user:req.user._id
        };
        req.body.user = req.user._id; // for post/create address
        next();
    }


}

export const _AddressesControllers = new AddressesControllers;
