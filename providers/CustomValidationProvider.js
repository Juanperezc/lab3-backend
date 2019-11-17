'use strict'

const { ServiceProvider } = require('@adonisjs/fold')


class CustomValidationProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Validator = use('Validator');
    // Register
    Validator.extend('publicationExists', this._publicationExists, 'Publicación existente');
    Validator.extend('commentaryExists', this._commentaryExists, 'Comentario existente');
    //
  }

  /*
  * Validate if mongo exist
  *
  * @usage Publication
  */
 async _publicationExists(data, field, message, args, get) {
   // Same as data[ field ].
   const value = get(data, field)
/*    const personId = get(data, field); */
   // Get info from DB

   const row = await use('App/Models/Publication').find(value);
   // If this person doesn't exists
   if (!row) {
     throw 'row not found!';
   }
 }


  /*
  * Validate if mongo exist
  *
  * @usage Commentary
  */
 async _commentaryExists(data, field, message, args, get) {
  // Same as data[ field ].
  const value = get(data, field)
/*    const personId = get(data, field); */
  // Get info from DB

  const row = await use('App/Models/Commentary').find(value);
  // If this person doesn't exists
  if (!row) {
    throw 'row not found!';
  }
}

}


module.exports = CustomValidationProvider
