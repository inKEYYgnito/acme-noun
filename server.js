const express = require('express')
const app = express()
const path = require('path')
const db = require('./db/db')
const { Person, Place, Thing } = db.models

const logger = (req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`)
    next()
}

app.use(logger)

app.get('/', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'))
    } catch (e) {
        next(e)
    }
})

app.get('/api/people', async (req, res, next) => {
    try {
        res.send(await Person.findAll())
    } catch (e) {
        next(e)
    }
})

app.get('/api/places', async (req, res, next) => {
    try {
        res.send(await Place.findAll())
    } catch (e) {
        next(e)
    }
})

app.get('/api/things', async (req, res, next) => {
    try {
        res.send(await Thing.findAll())
    } catch (e) {
        next(e)
    }
})

db.setup()
    .then(() => {
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log('Listening on port', port))
    })
    .catch(ex => console.log('Error:', ex))

