'use strict'

const UserSeeder = require('./UserSeeder')
const RolSeeder = require('./RolSeeder')
const CountrySeeder = require('./CountrySeeder')
const Category = require('./CategorySeeder')
const PublicationSeeder = require('./PublicationSeeder')

class MongoSeeder {
  async run () {
    await RolSeeder.run()
    await CountrySeeder.run()
    await Category.run()
    await UserSeeder.run()
    await PublicationSeeder.run()
  }
}

module.exports = MongoSeeder
