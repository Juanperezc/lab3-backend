'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicationLikesSchema extends Schema {
  up () {
    this.collection('publication_likes', (collection) => {
      collection.index('publication_likes_index', {id: 1})
    });
  }

  down () {
    this.drop('publication_likes')
  }
}

module.exports = PublicationLikesSchema
