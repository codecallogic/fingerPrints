const mongoose      = require('mongoose')
const Schema        = mongoose.Schema

const notesSchema    = new Schema({
    key: {
        type: Number,
        require: true,
    },
    startTime: {
        type: Number,
        required: true
    }
})

const songSchema   = new Schema({
    notes: [notesSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('Song', songSchema)