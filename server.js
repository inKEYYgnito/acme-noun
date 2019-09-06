const express = require('express')
const app = express()
const path = require('path')
const db = require('./db/db')

const logger = (req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`)
    next()
}
app.use(logger)

/* routes */
app.use('/api/people', require('./api/people'))
app.use('/api/places', require('./api/places'))
app.use('/api/things', require('./api/things'))

/* serve UI */
app.get('/', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'))
    } catch (e) {
        next(e)
    }
})

/* initiate db connection */
db.setup()
    .then(() => {
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log('Listening on port', port))
    })
    .catch(ex => console.log('Error:', ex))

