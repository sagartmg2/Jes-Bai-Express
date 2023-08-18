const jwt = require("jsonwebtoken")

/* middleware  // a function which has access to req and response  and also next middleware*/
const checkAuthentication = (req, res, next) => {

    console.log("checking...")
    let token = req.headers.authorization?.replace("Bearer ", "")
    console.log(token);
    let loggedIn = false

    try {
        var decoded = jwt.verify(token, 'shhhhh');
        console.log(decoded);
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

module.exports = {
    checkAuthentication
}