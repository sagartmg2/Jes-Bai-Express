/* relational database(sql) and no-sql */

// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: String,
    price: Number,
});

module.exports = mongoose.model("Product", ProductSchema)