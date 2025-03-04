const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTPASS)
            req.userId = jwtResponse.userId
            next()
        } catch (error) {
            res.status(408).json("Authorization Failed.. Please Login!!!")
        }
    } else {
        res.status(401).json("Authorization Failed.. Token Missing!!!")
    }
}

module.exports = jwtMiddleware