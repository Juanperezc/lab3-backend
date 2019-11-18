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

const getRol = (max, min)=>{
   const x = parseInt(Math.random() * (max - min) + min);

   return x > 1 ? "Member" : "Admin";
}

const getStatus = (max , min)=>{
   const x = parseInt(Math.random() * (max - min) + min);

   return x > 1 ? "Active" : "Banned";
}




Factory.blueprint('App/Models/User', async (faker) => {
    return {
      email: faker.email(),
      full_name: faker.name(),
      password: faker.password(),
      photo: faker_node.image.avatar(),
      birth_date: moment().toDate(),/* , faker.birthday({string: true, american: false}) */
      phone: faker.phone({ country: "us" }),
      country: faker_node.address.country(),
      city: faker.city(),
      alias: faker.username(),
      rol: getRol(8,1),
      status: getStatus(12,1),
      threads: [],
      notifications: [],
      followers: [],
      following: []
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
    /*   commentaries: [
      ], */
      likes:[
      ],
      created_at : moment().toDate(),
      updated_at: moment().toDate(),
    }
  })

  Factory.blueprint('App/Models/Commentary', (faker, i ,data) => {
    return {
      body: faker.sentence(),
      user_id : (data.user_id) && data.user_id || null,
      publication_id:  (data.publications_id) && data.publications_id[i] || null,
      parent_id: null,
      likes:[
      ],
      created_at : moment().toDate(),
      updated_at: moment().toDate(),
    }

  });