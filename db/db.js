const Sequelize = require('sequelize')
const conn = new Sequelize('postgres://localhost/acme_db')

const validator = {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}
const Person = conn.define('person', validator)
const Place = conn.define('place', validator)
const Thing = conn.define('thing', validator)

const setup = async () => {
    await conn.sync({ force: true }) // only done on dev!
}

module.exports = {
    setup,
    models: {
        Person,
        Place,
        Thing
    }
}
