'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PublicationLike extends Model {
    static get objectIDs() { return ['_id'] } //default return ['_id']
    static get hidden () {
    }
    author() {
        return this.belongsTo('App/Models/User', 'user_id', '_id')
    }
    publication(){
        return this.belongsTo('App/Models/Publication', 'publication_id', '_id')
    }
}

module.exports = PublicationLike
