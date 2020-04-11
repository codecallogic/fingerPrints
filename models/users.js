const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const userSchema    = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
},  {
    timestamps: true
})

module.exports = mongoose.models('User', userSchema)