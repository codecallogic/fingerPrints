const Song = require('../models/songs')

module.exports = {
    create,
    songHistory,
}

async function create(req, res){
    console.log(req.user)
    try {
        const song = new Song({
            notes: req.body
        })
        await song.save()
        res.json(song)
    }catch (err) {
        res.status(400).json(err)
    }
}

async function songHistory(req, res){
    const songs = await Song.find({})
    res.status(200).json(songs)
}