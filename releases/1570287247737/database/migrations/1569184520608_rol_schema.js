'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolSchema extends Schema {
  up () {
    this.collection('roles', (collection) => {
      collection.index('rol_index', {id: 1}) //, {unique: true}
    })
  }
  down () {
    this.drop('roles')
  }
}

module.exports = RolSchema
