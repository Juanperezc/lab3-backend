'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Commentary extends Model {
    static get objectIDs() { return ['_id'] } //def
    static get hidden () 
    {
        return ['user_id', 'publication_id']
    }
    author() {
        return this.hasOne('App/Models/User', 'user_id', '_id')
    }
    parent() {
        return this.belongsTo('App/Models/Publication', 'publication_id', '_id')
    }
}

module.exports = Commentary
