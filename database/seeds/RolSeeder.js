'use strict'

/*
|--------------------------------------------------------------------------
| RolSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Rol = use('App/Models/Rol')
class RolSeeder {
  async run () {
    await Rol.create({ name: 'admin',
     });
    await Rol.create({ name: 'user',
    });
    await Rol.create({ name: 'provider',
  });
  }
}

module.exports = RolSeeder
