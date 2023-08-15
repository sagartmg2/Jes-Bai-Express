const express = require('express')

require("./config/database")
const Product = require("./model/Product")
const User = require('./model/User')

const app = express()

/* middleware  // a function which has access to req and response  and also next middleware*/
const checkAuthentication = (req, res, next) => {

    console.log("checking...")
    let loggedIn = false
    if (loggedIn) {
        next()
    } else {
        res.status(401).send({
            msg: "unauthenticated."
        })
    }
}

// app.use(checkAuthentication)

app.use(express.json()) // global middleware // runs for every api routes // sets-up data in req.body

app.post("/api/signup", async (req, res) => {
    try {
        let user = await User.create(req.body)
        res.send(user)
    } catch (err) {
        console.log(err.message) // ValidationError
        if (err.name === "ValidationError") {
            return res.status(400).send({
                msg: "Bad Request",
                errors: err.errors
            })
        }
        res.status(500).send({ msg: "Server error" })
    }
})




app.post('/api/products', checkAuthentication, async function (req, res) {
    try {
        let product = await Product.create({ title: req.body.title, price: req.body.price })
        res.send(product)
    } catch (err) {
        res.status(500).send({ msg: "Server error" })
    }
})

app.get('/api/products', async function (req, res) {
    try {
        let products = await Product.find()
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "Server error" })
    }
})

app.listen(8000, () => {
    console.log("server started");
})