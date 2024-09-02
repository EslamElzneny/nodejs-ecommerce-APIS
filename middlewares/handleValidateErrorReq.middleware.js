import { validationResult } from 'express-validator'
import { _AppError } from '../utils/appError.js';
export const handleValidateErrorReq = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(_AppError.create(errors.array(),400));
    }

    next();
}
