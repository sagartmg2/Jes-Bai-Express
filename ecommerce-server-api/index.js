const express = require('express')
const Joi = require('joi');
const bcrypt = require("bcrypt")
require("./config/database")
const Product = require("./model/Product")
const User = require('./model/User');
const handleServerError = require('./middleware/handleServerError');
var jwt = require('jsonwebtoken');

const app = express()

/* middleware  // a function which has access to req and response  and also next middleware*/
const checkAuthentication = (req, res, next) => {

    console.log("checking...")
    console.log(req.headers.authorization);

    /*  */

    
    let loggedIn = true
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

const loginSchema = Joi.object({
    password: Joi.string()
        .alphanum()
        .min(8)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
})

app.post("/api/login", async (req, res, next) => {
    try {
        const { error: err } = loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (err) {
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
        }

        let user = await User.findOne({ email: req.body.email })
        console.log(user);

        if (user) {
            let matched = await bcrypt.compare(req.body.password, user.password);
            console.log({ matched })
            if (matched) {
                let token = jwt.sign(user.toObject(), 'shhhhh');
                return res.send({
                    user,
                    token
                })
            }
        }

        res.status(401).send({
            msg: "Invalid credentaisls.."
        })

    } catch (err) {
        next(err)
    }


})

app.post("/api/signup", async (req, res, next) => {
    try {
        const { error: err } = signupSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (err) {
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
        }


        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        console.log(hashedPassword);
        /* spread operator ... */
        let user = await User.create({ ...req.body, password: hashedPassword })
        console.log(user);
        res.send(user)


    } catch (err) {
        next(err)
    }
})




app.post('/api/products', checkAuthentication, async function (req, res, next) {
    try {
        let product = await Product.create({ title: req.body.title, price: req.body.price })
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