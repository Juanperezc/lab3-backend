'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Publication extends Model {

    static get objectIDs() { return ['_id', 'user_id'] } //default return ['_id']
    static get hidden () {
      return ['parent_id']
    }
    user() {
        return this.belongsTo('App/Models/User', 'user_id', '_id')
      }
    parent() {
        return this.hasOne('App/Models/Publication', 'parent_id', '_id')
    }
    author() {
      return this.hasOne('App/Models/User', 'user_id', '_id')
    }
    commentaries () {
      return this.hasMany('App/Models/Commentary', '_id', 'publication_id')
    }
    likes() {
      return this.hasMany('App/Models/PublicationLike', '_id', 'publication_id')
    }
}

module.exports = Publication
