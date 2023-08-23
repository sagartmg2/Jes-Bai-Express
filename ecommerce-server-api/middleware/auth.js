const jwt = require("jsonwebtoken");
const { SELLER, BUYER } = require("../constants/role");

/* middleware  // a function which has access to req and response  and also next middleware*/
const checkAuthentication = (req, res, next) => {

    console.log("checking...")
    let token = req.headers.authorization?.replace("Bearer ", "")
    // console.log(token);
    let loggedIn = false

    try {
        var decoded = jwt.verify(token, 'shhhhh');
        // console.log(decoded);
        loggedIn = true
        req.user = decoded

    } catch (err) {

    }

    /*  */


    if (loggedIn) {
        next()
    } else {
        res.status(401).send({
            msg: "unauthenticated."
        })
    }
}

const isSeller = (req, res, next) => {

    if (req.user.role === SELLER) {
        next()
    } else {
        res.status(403).send({
            msg: "Access Denied. only for seller."
        })
    }
}

const isBuyer = (req, res, next) => {
    if (req.user.role === BUYER) {
        next()
    } else {
        res.status(403).send({
            msg: "Access Denied. only for buyer."
        })
    }
}

module.exports = {
    checkAuthentication,
    isSeller,
    isBuyer
}