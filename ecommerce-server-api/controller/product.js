const Product = require("../model/Product")

const getProducts = async function (req, res, next) {
    try {
        let products = await Product.find()
        res.send(products)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const storeProducts = async function (req, res, next) {
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
}

module.exports = {
    getProducts,
    storeProducts
}