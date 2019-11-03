'use strict'
const User = use('App/Models/User');
class UserController {

    async index({ request, response }) {
        let users = await User.query().with('publications').fetch()
        return response.json({"users": users})
    }
        async show({ request, response }) {
        let users = await User.query().with('publications').fetch()
        return response.json({"users": users})
    }

    async me({ request,auth, response }) {
        try {
            const user = await auth.getUser()
            const user_model = await User.find(user._id).with('publications')
            return response.json({"user": user_model})
          } catch (error) {
            response.status(500).json(error);
          }

    }

}

module.exports = UserController
