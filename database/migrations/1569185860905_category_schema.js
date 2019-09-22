'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.collection('categories', (collection) => {
      collection.index('category_index', {id: 1},  {unique: true})
    });
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
