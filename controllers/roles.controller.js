import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { Role } from "../models/Role.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";
import { _AppError } from "../utils/appError.js";
import { httpStatus } from "../utils/httpStatus.js";

const _db = new HandlersFactory(Role);

class RolesControllers {
    constructor(){
    }
    index = _db.getAllByPaginate;

    store = _db.createOne;

    show = _db.getOne;

    update = _db.updateOne;
    
    destroy = _db.deleteOne;
    
    checkRoleNameIsUnique = asyncWrapper(
        async (req,res,next) => {
            const doc = await Role.findOne({name:req.body.name,_id:{$ne:req.params.id}})
            if(doc){
                return next(_AppError.create('Role name is already exist!',400,httpStatus.FAIL))
            }
            next();
        }
    );

}

export const _RolesControllers = new RolesControllers;
