import { Address } from "../models/address.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";
import { UserRole } from "../utils/enums/userRole.enum.js";

const _db = new HandlersFactory(Address);

class AddressesControllers {
    constructor(){
    }
    index = _db.getAllByPaginate;

    store = _db.createOne;

    show = _db.getOne;

    update = _db.updateOne;
    
    destroy = _db.deleteOne;

    filterAddressForLoggedUser = (req,res,next) => {
        if (req.user.role === UserRole.USER) req.filterObj = { user: req.user._id };
        req.body.user = req.user._id; // for post/create address
        next();
    }


}

export const _AddressesControllers = new AddressesControllers;
