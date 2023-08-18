const express = require('express')
require("./config/database")
const Product = require("./model/Product")
const handleServerError = require('./middleware/handleServerError');
const { checkAuthentication } = require('./middleware/auth');
const authRoutes = require("./routes/auth")

const app = express()

app.use(express.json()) // global middleware // runs for every api routes // sets-up data in req.body

app.use(authRoutes)

app.post('/api/products', checkAuthentication, async function (req, res, next) {
    try {
        console.log("req.user", req.user)
        let product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            createdBy: req.user._id
        })
        res.send(product)
    } catch (err) {
        next(err)
    }
})

app.get('/api/products', async function (req, res, next) {
    try {
        let products = await Product.find()
        res.send(products)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

app.use((req, res) => {
    res.status(404).send({ msg: "Resource Not found" })
})

app.use(handleServerError)

app.listen(8000, () => {
    console.log("server started");
})