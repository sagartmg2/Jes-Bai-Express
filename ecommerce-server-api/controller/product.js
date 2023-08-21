const { default: mongoose } = require("mongoose")
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
        let product = await Product.create({ ...req.body, createdBy: req.user._id })
        res.send(product)
    } catch (err) {
        next(err)
    }
}

const deleteProduct = async function (req, res, next) {

    try {

        let product = await Product.findOne({ _id: req.params.id })
        if (product) {

            product = product.toObject()
            // console.log(product.createdBy.toString())
            // console.log(  req.user._id  )
            if (req.user._id !== product.createdBy.toString()) {
                return res.sendStatus(403)
            }

            await Product.findByIdAndDelete(req.params.id)
            return res.sendStatus(204)
        }
        else {
            res.status(404).send({ msg: "Resource Not found" })
        }

    }
    catch (err) {
        next(err)
    }
}


const updateProduct = async function (req, res, next) {

    try {

        let product = await Product.findOne({ _id: req.params.id })
        if (product) {

            product = product.toObject()
            if (req.user._id !== product.createdBy.toString()) {
                return res.sendStatus(403)
            }

            let updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            return res.send(updatedProduct)
        }
        else {
            res.status(404).send({ msg: "Resource Not found" })
        }

    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    getProducts,
    storeProducts,
    deleteProduct,
    updateProduct
}