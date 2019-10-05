'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountrySchema extends Schema {
  up () {
    this.collection('countries', (collection) => {
      collection.index('country_index', {id: 1})
    })
  }

  down () {
    this.drop('countries')
  }
}

module.exports = CountrySchema
