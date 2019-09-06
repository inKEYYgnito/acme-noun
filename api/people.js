const people = require('express').Router()
const { Person } = require('../db/db').models

people.get('/', async (req, res, next) => {
    try {
        res.send(await Person.findAll())
    } catch (e) {
        next(e)
    }
})

module.exports = people
