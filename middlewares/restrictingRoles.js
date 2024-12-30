const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;
function restriction(requiredRole = [])
{

    return (req, res , next) => {
        try {
            let authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')) {

                console.log("failed to get the token in restriction")
            }
            const splittingToken = authHeader.split(" ")[1]

            const signInPayload = jwt.verify(splittingToken, secretKey)


    if ( requiredRole.includes(signInPayload.role)) {
        console.log(`Access granted to ${signInPayload.role}`)
        res.status(200).json({message: `You are logged in as ${signInPayload.role}`})
        next()
    } else
    {
        return res.status(403).json({message: "Forbidden: You do not have the required permissions"});
    }


        }
        catch(err)
        {
            res.status(500).json({message: "Your given token is invalid to access the route"})
        }

        }

}
const restrictionForUser = restriction(['user', 'admin'])
const restrictionForAdmin = restriction(['admin'])
module.exports = {restrictionForUser , restrictionForAdmin}