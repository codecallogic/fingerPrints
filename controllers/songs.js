const Song = require('../models/songs')

module.exports = {
    create,
    play
}

async function create(req, res){
    console.log(req.body)
    try {
        const song = new Song({
            notes: req.body
        })
        await song.save()
        // res.json(song)
    }catch (err) {
        res.status(400).json(err)
    }
}

async function play(req, res){
    let song
    try {
        
    }catch(err){
        
    }
}