const jwt = require('jsonwebtoken');
const secretKey = "$ammarkhan9090";
// const {roless}  = require('../middlewares/authorization')

//thinking to import the roles after the permission is set in database then use that role
//in restricting and us the function in routing of both login(of user and admin route) after authorization middleware



 function authorization(req, res, next) {
    req.user =null
     try {
        let authHeader = req.headers.authorization;
        if(!authHeader){

            res.status(401).json({message: 'Authorization header is missing'})
        }
        console.log("Got the headers")
        if(authHeader && authHeader.startsWith("Bearer"))
        {
            const token = authHeader.split(" ")[1]
            const verifyToken = jwt.verify(token , secretKey)
            req.user = verifyToken;
            console.log('The user is',verifyToken)
            next()
        }
        else
        {
            res.status(401).json({message: 'You are restricted to access this'})
        }

    } catch (err) {
        return res.status(401).json({ error: "Token not found or unauthorized" });
    }


}

module.exports = {authorization};





