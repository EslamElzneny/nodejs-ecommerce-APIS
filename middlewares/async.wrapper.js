const appError = require("../utils/appError.js");
const httpStatus = require("../utils/httpStatus.js");

const asyncWrapper = (asyncFn) => {
    return (req,res,next) => {
        asyncFn(req,res,next).catch((err) => {
            err.statusCode = 500;
            err.statusText = httpStatus.ERROR
            next(err);
        })
    }
}
module.exports = asyncWrapper;
