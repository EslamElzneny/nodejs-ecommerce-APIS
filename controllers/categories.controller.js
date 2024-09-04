import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { Category } from "../models/Category.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";
import { _AppError } from "../utils/appError.js";
import { httpResp } from "../utils/httpResponse.js";

const _db = new HandlersFactory(Category);

class CategoryControllers {
    constructor(){
    }
    index = _db.getAllByPaginate;

    store = _db.createOne;

    show = _db.getOne;

    update = _db.updateOne;
    
    destroy = _db.deleteOne;

    checkCreatedCategoryIsNotExist = async (req,res,next) => {
        const doc = await Category.findOne({name:req.body.name});
        if(doc){
            const error = _AppError.create(`Category with name [${req.body.name}] is already exist`);
            return res.status(400).json(httpResp.error(error))
        }
        next();
    }

    checkUpdatedCategoryIsNotExist = async (req,res,next) => {
        const doc = await Category.findOne({name:req.body.name,_id:{$ne:req.params.id}});
        if(doc){
            const error = _AppError.create(`Category with name [${req.body.name}] is already exist`);
            return res.status(400).json(httpResp.error(error))
        }
        next();
    }

}

export const _CategoryControllers = new CategoryControllers;
