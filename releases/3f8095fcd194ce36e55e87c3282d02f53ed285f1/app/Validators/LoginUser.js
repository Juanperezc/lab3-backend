'use strict'

class LoginUser {
  async handle ({ request }, next) {
    request.request.headers['accept'] = 'application/json'
    await next()
  }
  async authorize () {
    return true
  }
  get rules () {
    return {
      email: 'required|email',
      password: 'required',
    }
  }
}

module.exports = LoginUser
