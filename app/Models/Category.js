'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get table () {
        return 'categorys'
      }
      static get collection () {
        return 'categorys'
      }
}

module.exports = Category
