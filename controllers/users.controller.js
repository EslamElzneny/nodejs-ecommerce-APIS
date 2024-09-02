const asyncWrapper = require("../middlewares/async.wrapper");

class UsersControllers {
    constructor(){}

    index = asyncWrapper(
        async (req,res,next) => {
            
        }
    );
}

module.exports = new UsersControllers;
