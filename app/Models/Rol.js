'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rol extends Model {
    static get table () {
        return 'roles'
      }
      static get collection () {
        return 'roles'
      }
}

module.exports = Rol