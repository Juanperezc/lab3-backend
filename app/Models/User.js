'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get hidden () {
    return ['password']
  }
  static get visible () {
    return ['_id', 'email','full_name','photo','birth_date','phone','city','country','alias','rol', 'status','followers', 'following']
  }
  static boot () {
    super.boot()
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
/*   followers() {
    return this.belongsToMany('App/Models/Follow', 'follower_id', '_id')
  }
  following() {
      return this.belongsToMany('App/Models/Follow', 'user_id', '_id')
  } */
  publications () {
    return this.hasMany('App/Models/Publication', '_id', 'user_id')
 //  return this.hasMany('App/Model/Publication', '_id', 'user_id')
   // return this.hasMany('App/Model/Publication')
  }

}

module.exports = User