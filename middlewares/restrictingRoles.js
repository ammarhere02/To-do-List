
function restrictRoles(roles = [])
{

    console.log(roles)
    return (req, res , next) => {

        if(roles.includes(req.user.role))
        {
            return res.status(200).json({message : "Access granted"})
        }
        else
        {
             res.status(403).json({message : "Access denied"})
        }
        next()
    }

}

module.exports = {restrictRoles}