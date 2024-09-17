import { Role } from "../models/Role.model.js";
import { _AppError } from "../utils/appError.js";
import { CRUD_ } from "../utils/enums/CRUD.enum.js";

export const permissionsMiddleware = (modelName) => { // List_User
    return async (req,res,next) =>{ // return fn middleware
        const operation = getOperationFromRequestMethod(req.method)
        const role_doc = await Role.findOne({_id: req.user.roleId});
        const permissions_arr = role_doc.permissions.map(p=> p.name);
        const access_permission = operation + '_' + modelName;
        if(!permissions_arr.includes(access_permission)){
            return res.status(401).json(_AppError.create(`Permission {${access_permission}} is not allowed!`,401))
        }
        next();
    }
}

const getOperationFromRequestMethod = (method) => {
    switch(method) {
        case 'GET':
            return CRUD_.LIST
        
        case 'POST':
            return CRUD_.CREATE
        
        case 'PATCH':
            return CRUD_.UPDATE
        
        case 'DELETE':
            return CRUD_.DELETE
        
        default:
            return ''
    }
}
