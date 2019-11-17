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
var faker_node = require('faker');
class PublicationSeeder {
  static async run () {
    //* shared_id es un campo que puede o no existir
    const user_juan = await User.findBy('alias', 'juanperezc')
    const user_marco = await User.findBy('alias', 'marcosaenz')
    const publication = await Publication.create({
    user_id: user_marco._id,
    type: 'multimedia/post',
    title: faker_node.lorem.sentence(),
    body: faker_node.lorem.paragraph(),
    parent_id: null,
    photo : faker_node.image.business(640, 480,true),
    category: 'sports',
    created_at : moment().toDate(),
    updated_at: moment().toDate()});
    await Publication.create({
    user_id: user_juan._id,
    type: 'multimedia/post',
    photo : null,
    body: null,
    category: null,
    parent_id: publication._id,
    created_at : moment().toDate(),
    updated_at: moment().toDate()}); 
    
  }
}

module.exports = PublicationSeeder
