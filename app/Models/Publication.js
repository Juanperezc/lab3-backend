'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Publication extends Model {

    static get objectIDs() { return ['_id', 'user_id'] } //default return ['_id']

    user() {
        return this.belongsTo('App/Models/User', 'user_id', '_id')
      }
}

module.exports = Publication
