const express = require('express')
const Joi = require('joi');
const bcrypt = require("bcrypt")
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


/* client side validation */
/* server side validation */
/* database  validation */

const signupSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(8)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
})

app.post("/api/signup", async (req, res) => {
    try {
        const value = await signupSchema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });

        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        console.log(hashedPassword);
        /* spread operator ... */
        let user = await User.create({...req.body,password:hashedPassword})
        console.log(user);
        res.send(user)


    } catch (err) {
        console.log(err)
        let errors = err.details.map(el => {
            return {
                msg: el.message,
                params: el.context.key
            }
        })

        console.log(err.message) // ValidationError
        if (err.name === "ValidationError") {
            return res.status(400).send({
                msg: "Bad Request",
                errors: errors
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