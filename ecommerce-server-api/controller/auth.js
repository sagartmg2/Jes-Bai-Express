const User = require("../model/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Joi = require("joi")



/* client side validation */
/* server side validation */
/* database  validation */


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

const login = async (req, res, next) => {
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

        let user = await User.findOne({ email: req.body.email }).select({ "+password": 1 })

        if (user) {
            let matched = await bcrypt.compare(req.body.password, user.password);
            user = user.toObject()
            delete user.password

            if (matched) {
                let token = jwt.sign(user, 'shhhhh');
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


}


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

const signup = async (req, res, next) => {
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

        // let oldUser = await User.findOne({ email: req.body.email }) // 
        // if (oldUser) {
        //     return res.status(400).send({
        //         "msg": "Bad Request",
        //         "errors": [
        //             {
        //                 "msg": "email already used",
        //                 "params": "email"
        //             }
        //         ]
        //     })
        // }

        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        console.log(hashedPassword);
        /* spread operator ... */
        let user = await User.create({ ...req.body, password: hashedPassword })

        let userObj = user.toObject()
        delete userObj.password
        res.send(userObj)

    } catch (err) {
        next(err)
    }
}

module.exports = {
    login,
    signup
} 