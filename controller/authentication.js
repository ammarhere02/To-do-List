const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "$ammarkhan9090";
const {user} = require('../models/seeders/seeders');


const signUp = async (req, res) =>
{
    const {name , email , password} = req.body

    const hash = await bcrypt.hash(password, 10);
     await user.create({name , email ,  password: hash})

;

    const token = jwt.sign({name, email}, secretKey, {expiresIn: "1h"});

    await jwt.verify(token, secretKey, (err) => {
        if (err) {
            res.status(401).send({error: "Authentication Error"});
        }
        else
        {
            console.log(token)
            res.status(201).json("user created AND verified successfully" , token);
        }

    })

}
const signIn = async (req, res) =>
{
    try {

        const {email , password} = req.body
        const checkUser = await user.findOne({
            where: {email : email} ,
        })
        if (!checkUser) {

            res.send({error: "User not found"});
        }

        console.log("user found")

        console.log(password)

        const validPass = await bcrypt.compare(password , checkUser.password)
        if (!validPass) {

            res.status(401).send({error: "password not match"});
        }
        else
        {
            console.log("password matched")

            const token = jwt.sign({email : email}, secretKey, {expiresIn: "1h"});
            console.log(token)
            console.log("login verification successfull")
            return res.status(200).json({"success": true, token});
        }


    }
    catch (e) {
        console.log(e)

        res.status(401).json({error: "log-in failed"});

    }
}


module.exports = {signUp , signIn};

