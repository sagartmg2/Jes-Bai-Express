const { default: mongoose } = require("mongoose")
const Product = require("../model/Product")
const path = require("path")

const getProducts = async function (req, res, next) {
    try {

        console.log(req.query)

        const searchTerm = req.query.searchTerm || ""
        const priceFrom = parseFloat(req.query.priceFrom) || 0
        const priceTo = parseFloat(req.query.priceTo) || 999999999999999
        console.log({ searchTerm })


        // let products = await Product.find({ title: RegExp(searchTerm, "i") })

        // let products = await Product.find({ price: { $gt: priceFrom } })

        // find(filters,select)

        let products = await Product.find({
            $and: [
                { title: RegExp(searchTerm, "i") },
                { price: { $gte: priceFrom } },
                { price: { $lte: priceTo } },
            ]
        }, { description: 0 }).populate("createdBy", "name email")

        /* aggregate */

        res.send(products)


    } catch (err) {
        console.log(err)
        next(err)
    }
}

const getSingleProduct = async (req, res, next) => {
    try {
        let product = await Product.findOne({ _id: req.params.id }).populate("createdBy")
        res.send(product)
    } catch (err) {
        next(err)
    }

}

const storeProducts = async function (req, res, next) {

    console.log("body", req.body)
    console.log("files", req.files.image)
    // console.log(path.resolve())

    console.log(path.join(path.resolve(), "uploads"))
    let destination = path.join(path.resolve(), "uploads")
    destination = path.normalize(destination)

    console.log(__dirname)
    console.log(path.join(__dirname))

    req.files.image.mv(path.join(__dirname))
    return;

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
    updateProduct,
    getSingleProduct
}