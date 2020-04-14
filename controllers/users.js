const User      = require('../models/users')
const jwt       = require('jsonwebtoken')
const SECRET    = process.env.SECRET

module.exports = {
    signup,
    login
}

async function login(req, res){
    console.log(req.body)
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(401).json({err: 'Bad credentials'})
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch){
                const token = createJWT(user)
                res.json({token})
            }else{
                return res.status(401).json({err: 'Bad credentials'})
            }
        })
    } catch (err) {
        return res.status(401).json(err)
    }
}

async function signup(req, res){
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.json({token})
    } catch (err) {
        res.status(400).json(err)
    }
}

function createJWT(user){
    return jwt.sign(
        {user},
        SECRET,
        {expiresIn: '24h'}
    )
}