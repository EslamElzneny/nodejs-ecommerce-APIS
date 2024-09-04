import { Wishlist } from "../models/Wishlist.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";
import { _AppError } from "../utils/appError.js";
import { httpResp } from "../utils/httpResponse.js";

const _db = new HandlersFactory(Wishlist);

class WishlistControllers {
    constructor(){
    }
    index = _db.getAllByPaginate;

    store = _db.createOne;

    destroy = _db.deleteOne;

    checkCreatedWishlistIsNotExist = async (req,res,next) => {
        const doc = await Wishlist.findOne({product:req.body.product_id,user:req.user._id});
        if(doc){
            return res.status(201).json(httpResp.success(doc))
        }
        // add user id to body {}
        req.body.user = req.user._id;
        next();
    }

    addQueryInGetRequestObject = (req,res,next) => {
        req._query_obj = {
            user:req.user._id
        };
        next();
    }

}

export const _WishlistControllers = new WishlistControllers;
