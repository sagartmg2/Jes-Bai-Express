/* relational database(sql) and no-sql */

// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: String,
    image: String,
    // "/uploads/mouse.png"
    createdBy: {
        ref: "User",
        type: ObjectId,
    }
});

module.exports = mongoose.model("Product", ProductSchema)