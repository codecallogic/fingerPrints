const mongoose      = require('mongoose')
const Schema        = mongoose.Schema
const bcrypt        = require('bcrypt')
const SALT_ROUNDS   = 6

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

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
        if(err) return next(err)
        user.password       = hash
        next()
    })
})

userSchema.methods.comparePassword = function(tryPassword, cb){
    bcrypt.compare(tryPassword, this.password, cb)
}

module.exports = mongoose.model('User', userSchema)