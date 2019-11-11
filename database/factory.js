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

Factory.blueprint('App/Models/User', async (faker) => {
    return {
      email: faker.email(),
      full_name: faker.name(),
      password: faker.password(),
      photo: faker.avatar({protocol: 'https', email: faker.email()}),
      birth_date: faker.birthday({string: true, american: false}),
      phone: faker.phone({ country: "us" }),
      city: faker.city(),
      alias: faker.username(),
      rol: 'admin',
      threads: [],
      notifications: [],
      followers: [],
      following: []
    }
  })
