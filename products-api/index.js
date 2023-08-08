const express = require("express")
const app = express()

/* middleware
    function which has access to req and res and also can modify them. 

    and also has access to next valid middleware
*/


const checkAuthentication = (req, res, next) => {
    console.log("check authentication...")
    let loggedIn = true;
    if (!loggedIn) {
        return res.status(401).send({ msg: "unauthenticated" })
    }
    next()
}

const checkBuyer = (req, res, next) => {
    let role = "buyer"
    console.log("check buyer..")

    if (role === "buyer") {
        next()
    } else {
        res.status(403).send({
            msg: "forbidden"
        })
    }
}

app.use(express.json()) // global middleware // runs in ever route, sets up req.body 

// app.use(checkBuyer) // global middelware
// app.use(checkAuthentication) // global middleware 

/* protected routes */
app.get("/api/dashboard", checkAuthentication, (request, response) => { // route level middelware
    response.send("dashboard data.")
})

app.get("/api/orders", checkAuthentication, checkBuyer, (request, response) => {
    response.send("order data.")
})

app.post("/api/orders", checkAuthentication, checkBuyer, function (request, response) {
    console.log("req.body", request.body)
    response.send("create order .")
})

app.get("/api/test", (request, response) => {
    response.send("test successful")
})


app.listen(8000, () => {
    console.log("server started..")
})