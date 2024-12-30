const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;
const {user} = require('../models/seeders/seeders');


const signUp = async (req, res) =>
{
    const {name , email , password}  = req.body
    const hash = await bcrypt.hash(password, 10);
    const newUser = await user.create({name , email  , password: hash})
    console.log(newUser)
    const token = jwt.sign({email : newUser.email}, secretKey, {expiresIn: "1h"});
    console.log(token);
    return res.status(200).json({message: "User successfully signed up" , "token" : token});

}
const signIn = async (req, res) =>
{

    try {

        const {email , password} = req.body
        const checkUser = await user.findOne({
            where: {email : email} ,
        })
        if (!checkUser) {

          return  res.status(401).json({error: "User not found"});
        }

        console.log("user found")

        console.log(password)

        const validPass = await bcrypt.compare(password , checkUser.password)
        if (!validPass) {

           return res.status(401).json({error: "password not match"});
        }
        else
        {
            console.log("password matched")

            const token = jwt.sign({email : email , role: checkUser.role}, secretKey, {expiresIn: "1m"});
            console.log("login verification successfull")
            res.status(200).json({"success": true, token});
            console.log(token)

        }
        module.exports = function verifyToken(token)
        {
            const verify = jwt.verify(token, secretKey);

            if(!verify)
            {
                console.log("token not verified");
            }
            else
            {
                const userData = {email: verify.email};

                console.log("Token verified successfully" , userData)

            }
        }

    }
    catch (e) {
        console.log(e)

        res.status(401).json({error: "log-in failed"});

    }
}


module.exports = {signUp , signIn };
