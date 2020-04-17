const express   	= require('express')
const router    	= express.Router()
const songCtrl		= require('../../controllers/songs.js')

router.post('/add', songCtrl.create)
router.get('/all', songCtrl.songHistory)

module.exports  = router