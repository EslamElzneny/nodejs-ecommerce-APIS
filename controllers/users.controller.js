import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { User } from "../models/User.model.js";
import { _AppError } from "../utils/appError.js";
import { httpResp } from "../utils/httpResponse.js";


class UsersControllers {
    constructor(){}
    index = asyncWrapper(
        async (req,res,next) => {
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            const skip = (page - 1) * limit;
            const users = await User.find({},{__v:false}).limit(limit).skip(skip);
            res.json(httpResp.success(users));
        }
    );

    show = asyncWrapper(
        async (req,res,next)=>{
            const user = await User.find({_id:req.params.id});
            if(!user){
                const error = _AppError.create('User Not Found',404,httpStatus.FAIL)
                next(error);
            }
            return res.json(httpResp.success(user));
        }
    );
    
    update = asyncWrapper(
        async (req,res)=>{
            const userUpdated = await User.updateOne({_id:req.params.id},{$set:req.body});
            return res.json(userUpdated);
        }
    );
    
    destroy = asyncWrapper(
        async (req,res)=>{
            const deletedUser = await User.deleteOne({_id:req.params.id})
            return res.json(httpResp.success(deletedUser))
        }
    );

}

export const _UsersControllers = new UsersControllers;
