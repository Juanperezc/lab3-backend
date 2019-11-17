'use strict'

class StoreCommentary {
  async handle ({ request }, next) {
    request.request.headers['accept'] = 'application/json'
    await next()
  }
  async authorize () {
    return true
  }
  get rules () {
    return {
      publication_id: 'required|publicationExists:publications,id',
      body: 'required',
    }
  }
}

module.exports = StoreCommentary
