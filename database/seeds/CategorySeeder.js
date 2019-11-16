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
      status: 'Active'
    });

    await Category.create({
      name: 'Ropa',
      status: 'Active'
    })
    
    await Category.create({
      name: 'Zapatos',
      status: 'Active'
    })
    
    await Category.create({
      name: 'Medicina',
      status: 'Active'
    })
    
    await Category.create({
      name: 'Auto partes',
      status: 'Active'
    })
  }
}

module.exports = CategorySeeder
