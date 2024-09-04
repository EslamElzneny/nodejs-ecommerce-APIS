import { Product } from "../models/Product.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";
import { _AppError } from "../utils/appError.js";
import { httpResp } from "../utils/httpResponse.js";

const _db = new HandlersFactory(Product);

class ProductsControllers {
    constructor(){
    }
    index = _db.getAllByPaginate;

    store = _db.createOne;

    show = _db.getOne;

    update = _db.updateOne;
    
    destroy = _db.deleteOne;

    checkCreatedProductIsNotExist = async (req,res,next) => {
        const doc = await Product.findOne({title:req.body.title});
        if(doc){
            const error = _AppError.create(`Product with title [${req.body.title}] is already exist`);
            return res.status(400).json(httpResp.error(error))
        }
        next();
    }

    checkUpdatedProductIsNotExist = async (req,res,next) => {
        const doc = await Product.findOne({title:req.body.title,_id:{$ne:req.params.id}});
        if(doc){
            const error = _AppError.create(`Product with title [${req.body.title}] is already exist`);
            return res.status(400).json(httpResp.error(error))
        }
        next();
    }

}

export const _ProductControllers = new ProductsControllers;
