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
      birth_date: moment().toDate(),
      phone: '04245869872',
      password: '2514182657',
      country: 'Venezuela',
      city: 'Barquisimeto',
      alias: 'juanperezc',
      rol: 'Admin',
      status: 'Active',
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

    const publications_juan = await Factory.model('App/Models/Publication').createMany(5)
    const ids_publications_juan=  publications_juan.map(a => a._id);
    await Factory.model('App/Models/Commentary').createMany(5, { 
      user_id : user_juan._id,
      publications_id : ids_publications_juan});

    await user_juan.publications().saveMany(publications_juan)

    const user_marco = await User.create({
      email: 'test@test.com',
      full_name: 'Marco Saenz',
      photo: faker_node.image.avatar(),
      birth_date: moment().toDate(),
      phone: '04245774672',
      password: '1234567890',
      country: 'Venezuela',
      city: 'Cabudare',
      alias: 'marcosaenz',
      rol: 'Admin',
      status: 'Active',
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

     const user_leon = await User.create({
      email: 'leon@test.com',
      full_name: 'Luis Leon',
      photo: faker_node.image.avatar(),
      birth_date: moment().toDate(),
      phone: '04245869872',
      password: '12345',
      country: 'Venezuela',
      city: 'Barquisimeto',
      alias: 'leon23',
      rol: 'Admin',
      status: 'Active',
      threads: [
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

    const publications_leon = await Factory.model('App/Models/Publication').createMany(5)
    const ids_publications_leon =  publications_leon.map(a => a._id);
    console.log(ids_publications_leon);
    const commentaries_random = await Factory.model('App/Models/Commentary').createMany(5, { 
      user_id : user_leon._id,
      publications_id : ids_publications_leon});
     /* await publications_leon.commentaries().saveMany(commentaries_random);   */
/*     console.log(publications_leon.commentaries()) */
    await user_leon.publications().saveMany(publications_leon)
    
    const user = await Factory
    .model('App/Models/User')
    .createMany(50)

  }
}
module.exports = UserSeeder
