const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "$ammarkhan9090";
const { user } = require("../models/seeders/seeders");

const signUp = async (req, res) =>
{
    const {name , email , password} = req.body

    const hash = await bcrypt.hash(password, 10);
     await user.create({name , email ,  password: hash})
    res.status(201).json("user created successfully");

    const token = jwt.sign({name, email , hash}, secretKey, {expiresIn: "1h"});

    await jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({error: "Authentication Error"});
        }
        else
        {
            res.status(200).send({user : decoded});
        }

    })

}
const signIn = async (req, res) =>
{
    const {email , password} = req.body

    const checkUser = await user.findOne({
        where: {email : email }
    })
    if (!checkUser) {

        res.send({error: "User not found"});
    }

        const validPass = bcrypt.compare(password, checkUser.password );
        if (!validPass) {
            return res.status(400).send({ error: "Password does not match" });
        }

        const token = jwt.sign({email , password}, secretKey, {expiresIn: "1h"});

        await jwt.verify(token, secretKey, (err) => {

            if (err) {
                res.status(401).json({error: "log-in failed"});
            }
            else
            {
                return res.status(200).json({"success": true , token});
            }
        })
}


// const signIn = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//
//         if (!email || !password) {
//             return res.status(400).send({ error: "Missing email or password" });
//         }
//
//         const seeuser = await user.findOne({
//             where: { email: email },
//         }
//         );
//         console.log("i m after checkingn email")
//         if (!seeuser) {
//             return res.status(400).send({ error: "Email not found" });
//         }
//
//         const valid_pass = await bcrypt.compare(password, seeuser.password);
//
//         if (!valid_pass) {
//             return res.status(400).send({ error: "Password does not match" });
//         }
//
//         const token = jwt.sign(
//             { email: seeuser.email },
//             secretKey,
//             { expiresIn: "1h" }
//         );
//
//         res.status(200).json({
//             message: "User logged in successfully",
//             user: {
//                 name: seeuser.name,
//                 email: seeuser.email,
//             },
//             token,
//         });
//     } catch (error) {
//         res.status(500).send({ error: "Failed to authenticate user" });
//     }
// };


module.exports = {signUp , signIn};

