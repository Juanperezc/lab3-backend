'use strict'

class CommentaryLike {
  async handle ({ request }, next) {
    request.request.headers['accept'] = 'application/json'
    await next()
  }
  async authorize () {
    return true
  }
  get rules () {
    return {
      commentary_id: 'required|commentaryExists:commentaries,id',
    }
  }
}

module.exports = CommentaryLike
