import { httpStatus } from "../utils/httpStatus.js";

export const asyncWrapper = (asyncFn)=>{
    return (req,res,next) => {
        asyncFn(req,res,next).catch((err) => {
            err.statusCode = 500;
            err.statusText = httpStatus.ERROR
            next(err);
        })
    }
}
