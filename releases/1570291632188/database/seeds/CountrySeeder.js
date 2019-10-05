'use strict'

/*
|--------------------------------------------------------------------------
| CountrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Country = use('App/Models/Country')
const Factory = use('Factory')

class CountrySeeder {
  static async run () {
    let citiesV = [
      {
        name: "Barquisimeto"
      }
    ]
    await Country.create({ name: 'Venezuela',
    cities : citiesV});
  }
}

module.exports = CountrySeeder
