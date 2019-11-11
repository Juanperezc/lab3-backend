'use strict'

class UpdateUser {
  async handle ({ request }, next) {
    request.request.headers['accept'] = 'application/json'
    await next()
  }
  async authorize () {
    return true
  }
  get rules () {
    return {
      full_name: 'required',
      phone: 'required',
    }
  }
}

module.exports = UpdateUser
