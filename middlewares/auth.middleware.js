import jwt from 'jsonwebtoken';
import { _AppError } from "../utils/appError.js";
import { httpStatus } from "../utils/httpStatus.js";

export const authMiddleware = (req,res,next)=> {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    
    if(!authHeader){
        const error = _AppError.create('unauthorized',401,httpStatus.FAIL);
        return next(error);
    }

    const token = authHeader.split(' ')[1];

    try{
        const currentUser = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        req.user = currentUser;
        next();
    }catch(e){
        const error = _AppError.create('invalid toke',401,httpStatus.ERROR);
        next(error);
    }
    
}
