const things = require('express').Router()
const { Thing } = require('../db/db').models

things.get('/', async (req, res, next) => {
    try {
        res.send(await Thing.findAll())
    } catch (e) {
        next(e)
    }
})

module.exports = things
