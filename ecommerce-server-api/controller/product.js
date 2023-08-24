const { default: mongoose } = require("mongoose")
const Product = require("../model/Product")
const path = require("path")

const getProducts = async function (req, res, next) {
    try {

        console.log(req.query)

        const searchTerm = req.query.searchTerm || ""
        const priceFrom = parseFloat(req.query.priceFrom) || 0
        const priceTo = parseFloat(req.query.priceTo) || 999999999999999
        const perPage = parseInt(req.query.perPage) || 2
        const page = parseInt(req.query.page) || 1
        console.log({ searchTerm })


        // let products = await Product.find({ title: RegExp(searchTerm, "i") })

        // let products = await Product.find({ price: { $gt: priceFrom } })

        // find(filters,select)

        let filterOptions = {
            $and: [
                { title: RegExp(searchTerm, "i") },
                { price: { $gte: priceFrom } },
                { price: { $lte: priceTo } },
            ]
        }

        let total = await Product.find(filterOptions)
        // total = total.length
        let products = await Product.find(filterOptions, { description: 0 }).populate("createdBy", "name email")
            .skip((page - 1) * perPage)
            .limit(perPage)


        res.send({
            total,
            page,
            perPage,
            products
        })


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

    let destination = path.join(path.resolve(), "uploads", req.files.image.name)

    req.files.image.mv(destination)

    try {
        let product = await Product.create({ ...req.body, createdBy: req.user._id, image: req.files.image.name })
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