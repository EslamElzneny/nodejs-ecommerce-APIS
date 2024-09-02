import { _AppError } from "../utils/appError.js";

export const permissionsMiddleware = (...roles) => {
    return (req,res,next) =>{ // return fn middleware
        const role = req.user.role;
        if(!roles.includes(role)){
            return res.json(_AppError.create(`Permission {${role}} is not allowed!`,401))
        }
        next();
    }
}
