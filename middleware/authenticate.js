const jwt = require("jsonwebtoken")
// require("dotenv").config();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "linkedin", (err, decoded) => {
            if (decoded) {
                req.body.UserID = decoded.userID;
                next()
            } else {
                res.send({ "msg":"Please Log In First"})
            }
        })
    }
    else {
        res.send({ "msg":"Please Log In First"})
    }
}
module.exports = {
    authenticate
}