'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentaryLikesSchema extends Schema {
  up () {
    this.collection('commentary_likes', (collection) => {
      collection.index('commentary_likes_index', {id: 1})
    });
  }

  down () {
    this.drop('commentary_likes')
  }
}

module.exports = CommentaryLikesSchema
