'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicationSchema extends Schema {
  up () {
    this.collection('publications', (collection) => {
      collection.index('publication_index', {id: 1})
    });
  }

  down () {
    this.drop('publications')
  }
}

module.exports = PublicationSchema
