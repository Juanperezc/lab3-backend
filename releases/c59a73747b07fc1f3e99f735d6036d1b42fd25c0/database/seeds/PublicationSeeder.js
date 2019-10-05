'use strict'

/*
|--------------------------------------------------------------------------
| PublicationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Publication = use('App/Models/Publication')
const moment = require('moment')
const User = use('App/Models/User')

class PublicationSeeder {
  static async run () {
    //* shared_id es un campo que puede o no existir
    const user = await User.findBy('alias', 'juanperezc')

    const publication = await Publication.create({ 
    user_id: user._id,
    type: 'multimedia/post',
    body: 'Vendo guante blablabla',
    category: 'sports',
    comentaries: [
      {
        body: '100 verdes',
        likes:[{
          user_alias: 'juanperezc',
          created_at : moment().toDate(),
          updated_at: moment().toDate(),
        }],
        created_at : moment().toDate(),
        updated_at: moment().toDate(),
      }
    ],
    likes:[
      {
        user_alias: 'juanperezc',
        created_at : moment().toDate(),
        updated_at: moment().toDate(),
      }
    ]});
    await Publication.create({ user_alias: 'juanperezc',
    type: 'multimedia/post',
    body: 'Vendo guante blablabla',
    category: 'sports',
    comentaries: [
      
    ],
    likes:[
     
    ],
   shared_id: publication._id});
  }
}

module.exports = PublicationSeeder
