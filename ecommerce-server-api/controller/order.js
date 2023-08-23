const Order = require("../model/Order")
const Product = require("../model/Product")


const getOrder = async (req, res, next) => {
    let orders = await Order.find({ createdBy: req.user._id }).populate("createdBy", "name email")
    res.send(orders)
}

const createOrder = async (req, res, next) => {

    try {

        let products = []

        /* async await inside forEach doesnot wait for tasks outside forEach
        req.body.products.forEach(async (element) => {
            let db_product = await Product.findOne({ _id: element._id })
            console.log({ db_product })
            products.push({
                ...db_product,
                quantity: element.quantity
            })
        })
        
        */


        for (let index = 0; index < req.body.products.length; index++) {

            let element = req.body.products[index]

            let db_product = await Product.findOne({ _id: element._id })
            console.log({ db_product })
            products.push({
                ...db_product.toObject(),
                unitPrice: db_product.price,
                quantity: element.quantity
            })
        }


        console.log({ products })

        let order = await Order.create({
            products,
            createdBy: req.user._id
        })
        res.send(order)
    }
    catch (err) {
        next(err)
    }

}

module.exports = {
    createOrder,
    getOrder,
}