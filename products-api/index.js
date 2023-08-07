const express = require("express")
const app = express()


/* middleware
    function which has access to req and res and also can modify them. 

    and also has access to next valid middleware
*/

const checkAuthentication = (req, res, next) => {
    console.log("check authentication...")
    let loggedIn = false;
    if (!loggedIn) {
        return res.status(401).send({ msg: "unauthenticated" })
    }
    next()
}


// app.use(checkAuthentication) // global middleware 


/* protected routes */


app.get("/api/dashboard", checkAuthentication, (request, response) => { // route level middelware
    response.send("dashboard data.")
})
app.get("/api/orders", checkAuthentication, (request, response) => {
    response.send("order data.")
})

app.get("/api/test", (request, response) => {
    response.send("test successful")
})


app.listen(8000, () => {
    console.log("server started..")
})