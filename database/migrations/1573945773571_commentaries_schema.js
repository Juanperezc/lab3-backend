'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentariesSchema extends Schema {
  up () {
    this.collection('commentaries', (collection) => {
      collection.index('commentaries_index', {id: 1})
    });
  }

  down () {
    this.drop('commentaries')
  }
}

module.exports = CommentariesSchema
