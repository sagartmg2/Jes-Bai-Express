/* relational database(sql) and no-sql */

// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

// reference documets
// let orders = [
//     {
//         products: [product_id, product2_id],
//         createdBy: user
//     }
// ]

/* embeded documenet / nested documents */
// let orders2 = [
//     {
//         products: [
//             { name: watch, quantity: 2 },
//             { name: keyboard, quantity: 5 }
//         ],
//         createdBy: user,
//     }

// ]

const OrderSchema = new Schema({
    products: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                require: true,
                min: 0
            }
        }
    ],
    createdBy: {
        ref: "User",
        type: ObjectId,
    }
});

module.exports = mongoose.model("Order", OrderSchema)