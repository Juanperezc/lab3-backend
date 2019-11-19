'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const moment = require('moment')
const gravatarUrl = require('gravatar-url');
const coolImages = require("cool-images");
var faker_node = require('faker');

Factory.blueprint('App/Models/User', async (faker) => {
    return {
      email: faker.email(),
      full_name: faker.name(),
      password: faker.password(),
      photo: faker_node.image.avatar(),
      birth_date: moment().toDate(),/* , faker.birthday({string: true, american: false}) */
      phone: faker.phone({ country: "us" }),
      country: 'Venezuela',
      city: faker.city(),
      alias: faker.username(),
      rol: 'admin'
    }
  })
  Factory.blueprint('App/Models/Publication', (faker) => {
    return {
      type: 'multimedia/post',
      parent_id: null,
      title: faker.sentence(),
      body: faker.paragraph(),
      photo : faker_node.image.business(640, 480,true),/*  */
      category: 'sports',
      created_at : moment().toDate(),
      updated_at: moment().toDate(),
    }
  })
  Factory.blueprint('App/Models/PublicationLike', (faker, i ,data) => {
    return {
      user_id : (data.user_id) && data.user_id || null,
      commentary_id:  (data.commentary_id) && data.commentary_id || null,
      created_at : moment().toDate(),
      updated_at: moment().toDate(),
    }
  });
  Factory.blueprint('App/Models/Commentary', (faker, i ,data) => {
    return {
      body: faker.sentence(),
      user_id : (data.user_id) && data.user_id || null,
      publication_id:  (data.publications_id) && data.publications_id[i] || null,
      parent_id: null,
      created_at : moment().toDate(),
      updated_at: moment().toDate(),
    }

  });
  Factory.blueprint('App/Models/CommentaryLike', (faker, i ,data) => {
    return {
      user_id : (data.user_id) && data.user_id || null,
      commentary_id:  (data.commentary_id) && data.commentary_id || null,
      created_at : moment().toDate(),
      updated_at: moment().toDate(),
    }
  });