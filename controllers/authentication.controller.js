import bcrypt from 'bcryptjs';
import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { User } from "../models/User.model.js";
import { _AppError } from "../utils/appError.js";
import { httpStatus } from "../utils/httpStatus.js";
import { httpResp } from '../utils/httpResponse.js';
import { generateJWT } from '../utils/generateJWT.js';

class Authentication {
    constructor(){}

    register = asyncWrapper(
        async (req,res,next) => {
            const { name , email , password , ruleId } = req.body;

            const existUser = await User.findOne({email});

            if(existUser){
                const error = _AppError.create('User already exist',400,httpStatus.FAIL)
                return next(error);
            }

            // generate hash password
            const password_hashed = await bcrypt.hash(password,+process.env.HASH_SALT);

            let user = new User({
                name,
                email,
                role:ruleId,
                password: password_hashed,
                created_at: new Date(),
            });

            // generate jwt token
            const token = await generateJWT({email,name,_id:user._id,roleId:user.role._id});
            user.token = token;

            await user.save()
            return res.status(201).json(httpResp.success(user)); 

        }
    );

    login = asyncWrapper(
        async (req,res,next) => {
            const { email , password } = req.body;

            const user = await User.findOne({email});
            if(!user){
                const error = _AppError.create('Please check your input data.',400,httpStatus.FAIL);
                return next(error);
            }

            const matchedPassword = await bcrypt.compare(password,user.password,);

            if(!matchedPassword){
                const error = _AppError.create('Please check your input data.',400,httpStatus.FAIL);
                return next(error);
            }

            const token = await generateJWT({email,_id:user._id,name:user.name,roleId:user.role._id});
            user.token = token;

            await user.save();

            return res.json(httpResp.success(user));

        }  
    );

}

export const _AuthController = new Authentication;
