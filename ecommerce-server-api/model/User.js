
const mongoose = require("mongoose");

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        required:true,
        type: String,
        enum: ["seller", "buyer"]
    }
});

module.exports = mongoose.model("User", UserSchema)