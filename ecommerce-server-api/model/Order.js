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
    products: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                unitPrice: {
                    type: Number,
                    require: true,
                    min: 0
                }
            }
        ],
        validate: {
            validator: function (products) {
                if (products.length == 0) {
                    return false
                }
            },
            message: "atleast one product required.."
        }

    },
    createdBy: {
        required: true,
        ref: "User",
        type: ObjectId,
    }
});

module.exports = mongoose.model("Order", OrderSchema)