'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Category = use('App/Models/Category')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CategorySeeder {
  static async  run () {
    await Category.create({
      name: 'sports'
    })
  }
}

module.exports = CategorySeeder
