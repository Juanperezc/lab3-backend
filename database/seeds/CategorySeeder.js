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
      name: 'Alimentos',
      status: 'A'
    });

    await Category.create({
      name: 'Ropa',
      status: 'A'
    })
    
    await Category.create({
      name: 'Zapatos',
      status: 'A'
    })
    
    await Category.create({
      name: 'Medicina',
      status: 'A'
    })
    
    await Category.create({
      name: 'Auto partes',
      status: 'A'
    })
  }
}

module.exports = CategorySeeder
