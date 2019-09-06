
const places = require('express').Router()
const { Place } = require('../db/db').models

places.get('/', async (req, res, next) => {
    try {
        res.send(await Place.findAll())
    } catch (e) {
        next(e)
    }
})

module.exports = places
