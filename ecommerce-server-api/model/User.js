
const mongoose = require("mongoose");
const { SELLER, BUYER } = require("../constants/role");

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        /* custom validation */
        validate: {
            validator: async function (value) {
                let oldUser = await mongoose.models.User.findOne({ email: value })
                if (oldUser) {
                    return false
                }
                return true
            },
            message: "email alreay used"
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        required: true,
        type: String,
        set: function (value) {
            console.log({ value })
            return value.toLowerCase()
        },
        enum: [SELLER, BUYER]
    }
});

module.exports = mongoose.model("User", UserSchema)