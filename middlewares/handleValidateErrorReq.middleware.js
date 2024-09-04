import { validationResult } from 'express-validator'
import { _AppError } from '../utils/appError.js';
import { httpResp } from '../utils/httpResponse.js';
export const handleValidateErrorReq = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(httpResp.error(errors.array()));
    }
    next();
}
