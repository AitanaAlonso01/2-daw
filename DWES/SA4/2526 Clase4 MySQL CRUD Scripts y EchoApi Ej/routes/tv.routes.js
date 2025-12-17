const tvController = require("../controllers/tv.controller")
const express = require("express")
const router = express.Router()

//GET - Llamar por AXIOS al API tvmaze
router.get("/tv/:nombre",tvController.getTVShow)

module.exports = router