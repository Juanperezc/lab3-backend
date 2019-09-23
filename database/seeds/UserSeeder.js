'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const moment = require('moment')
const User = use('App/Models/User')

class UserSeeder {
  static async run () {
    await User.create({ email: 'juanl1996@hotmail.com',
    full_name :  'Juan Perez',
    date_birth : '',
    phone:  '04245869872',
    profile_pic : 'test',
    password: '2514182657',
    city : 'Barquisimeto',
    alias: 'juanperezc',
    rol: 'admin',
    threads : [
      {
        user_alias: 'marcosaenz',
        messages:[{
          body: 'Hola',
          sender_alias: 'juanperezc',
          created_at : moment().toDate(),
          updated_at: moment().toDate(),
        }],
        created_at : moment().toDate(),
        updated_at: moment().toDate(),
      }
    ],
    notifications:[
      {
        type: 'Request',
        content: 'data',
        read_at: null,
        created_at : moment().toDate(),
        updated_at: moment().toDate(),
      }
    ],
    followers:[{
      user_alias: 'marcosaenz',
      created_at : moment().toDate(),
      updated_at: moment().toDate(),
    }
    ]});
   // await User.create({ email: 'juanlxboxes@gmail.com' });
  }
}

module.exports = UserSeeder
