const express = require("express");
const usersController = require("../controllers/users.controller");
const userRouter = express.Router();

userRouter.route('/')
        .get(usersController.index);

module.exports = userRouter;
