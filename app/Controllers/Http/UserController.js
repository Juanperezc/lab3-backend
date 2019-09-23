'use strict'
const User = use('App/Models/User');
class UserController {

    async index({ request, response }) {
        let users = await User.query().with('publications').fetch()
        return response.json({"users": users})
    }

}

module.exports = UserController
