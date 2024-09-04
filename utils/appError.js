import { httpStatus } from "./httpStatus.js";

class AppError extends Error{
    constructor(){
        super();
    }
    create(message,statusCode = 400,statusText = httpStatus.FAIL){
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;
        return this;
    }
}

export const _AppError = new AppError;
