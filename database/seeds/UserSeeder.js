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
var faker_node = require('faker');
class UserSeeder {
  static async run() {
    const user_juan = await User.create({
      email: 'juanl1996@hotmail.com',
      full_name: 'Juan Perez',
      photo: faker_node.image.avatar(),
      birth_date: '',
      phone: '04245869872',
      password: '2514182657',
      city: 'Barquisimeto',
      alias: 'juanperezc',
      rol: 'admin',
      threads: [
        {
          user_alias: 'marcosaenz',
          messages: [{
            body: 'Hola',
            sender_alias: 'juanperezc',
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
          }],
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
        }
      ],
      notifications: [
        {
          type: 'Request',
          content: 'data',
          read_at: null,
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
        }
      ],
      followers: [{
        user_alias: 'marcosaenz',
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      }
      ],
      following: [{
        user_alias: 'marcosaenz',
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      }]
    });

    const publications_juan = await Factory.model('App/Models/Publication').makeMany(5)
    await user_juan.publications().saveMany(publications_juan)

    const user_marco = await User.create({
      email: 'test@test.com',
      full_name: 'Marco Saenz',
      photo: faker_node.image.avatar(),
      birth_date: null,
      phone: '04245774672',
      password: '1234567890',
      city: 'Cabudare',
      alias: 'marcosaenz',
      rol: 'admin',
      threads: [
        {
          user_alias: 'juanperezc',
          messages: [{
            body: 'Hola',
            sender_alias: 'marcosaenz',
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
          }],
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
        }
      ],
      notifications: [
        {
          type: 'Request',
          content: 'data',
          read_at: null,
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
        }
      ],
      followers: [{
        user_alias: 'juanperezc',
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      }
      ],
      following: [
        {
          user_alias: 'juanperezc',
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
        }
      ]
    });
    const publications_marco = await Factory.model('App/Models/Publication').makeMany(5)
    await user_marco.publications().saveMany(publications_marco)

    const user = await Factory
    .model('App/Models/User')
    .createMany(10)

  }
}

module.exports = UserSeeder
