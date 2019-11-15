'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.collection('categories', (collection) => {
      collection.increments()
    });
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
