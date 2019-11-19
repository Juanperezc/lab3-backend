'use strict'

class StoreUser {
  async handle ({ request }, next) {
    request.request.headers['accept'] = 'application/json'
    await next()
  }
  async authorize () {
    return true
  }
  get rules () {

    return {
      email: 'required|email|unique:users,email',
      password: 'required',
      full_name: 'required',
      country: 'required',
      alias: 'required|unique:users,alias',
      birth_date: 'required',
      city: 'required'/* , */
     /*  phone: 'required' */
    }
  }
}

module.exports = StoreUser
