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

Person.belongsTo(Place)
Place.hasMany(Person)
Thing.belongsTo(Person)
Person.hasMany(Thing)

const setup = async () => {
    await conn.sync({ force: true }) // only done on dev!
    const place1 = await Place.create({ name: 'NYC' })
    const place2 = await Place.create({ name: 'LA' })
    const place3 = await Place.create({ name: 'Boston' })
    const person1 = await Person.create({ name: 'Kristina', placeId: place1.id })
    const person2 = await Person.create({ name: 'Katsu', placeId: place1.id })
    const person3 = await Person.create({ name: 'Maria', placeId: place3.id })
    const thing1 = await Thing.create({ name: 'Pen', personId: person1.id })
    const thing2 = await Thing.create({ name: 'Paper', personId: person2.id })
    const thing3 = await Thing.create({ name: 'Chalk', personId: person3.id })
}

module.exports = {
    setup,
    models: {
        Person,
        Place,
        Thing
    }
}
