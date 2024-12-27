const express = require('express');
const {authorization} = require("../../middlewares/authorization")
const {restrictRoles} = require("../../middlewares/restrictingRoles")

const userRouter = express.Router();

const ROLE =
    {
        ADMIN: "admin",
        MANAGER: "manager",
        USER: "user",
    }

userRouter.get('/admin' , authorization ,restrictRoles([ROLE.ADMIN]),(req, res) => {

    res.status(200).json("Welcome Admin")

})

userRouter.get('/manager' ,authorization ,restrictRoles([ROLE.ADMIN , ROLE.MANAGER]), (req, res) => {

    res.status(200).json("Welcome Editor")
})

userRouter.get('/user', authorization , restrictRoles([ROLE.ADMIN , ROLE.MANAGER , ROLE.USER]),(req, res) => {

    res.status(200).json("Welcome User")
})

module.exports = userRouter