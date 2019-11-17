'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CommentaryLike extends Model {
    static get objectIDs() { return ['_id'] } //default return ['_id']
    static get hidden () {
    }
    author() {
        return this.belongsTo('App/Models/User', 'user_id', '_id')
    }
    commentary(){
        return this.belongsTo('App/Models/Commentary', 'publication_id', '_id')
    }
}

module.exports = CommentaryLike
