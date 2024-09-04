import { User } from "../models/User.model.js";
import { HandlersFactory } from "../services/handlersFactory.js";
import { _AppError } from "../utils/appError.js";

const _db = new HandlersFactory(User);

class UsersControllers {
    constructor(){}
    index = _db.getAllByPaginate;

    show = _db.getOne;

    update = _db.updateOne;
    
    destroy = _db.deleteOne;

}

export const _UsersControllers = new UsersControllers;
