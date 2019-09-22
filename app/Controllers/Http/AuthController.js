'use strict'
const User = use('App/Models/User');
class AuthController {

    async register({request, auth, response}) {
        const alias = request.input("alias")
        const full_name = request.input("full_name")
        const date_birth = request.input("date_birth")
        const phone = request.input("phone")
        const city = request.input("city")
        const email = request.input("email")
        const password = request.input("password")

        let user = await User.create({ email: email,
        full_name :  full_name,
        date_birth : date_birth,
        phone:  phone,
        profile_pic : null,
        password: password,
        city : city,
        alias: alias,
        rol: 'user',
        threads : [
        ],
        notifications:[
        ],
        followers:[
        ]});
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
}

async login({request, auth, response}) {
    const email = request.input("email")
    const password = request.input("password");
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        return response.json({"user":user, "access_token": accessToken})
      }

    }
    catch (e) {
      return response.json({message: 'You first need to register!'})
    }
}
}

module.exports = AuthController
