'use strict'
const User = use('App/Models/User');
const moment = require('moment')
class AuthController {

    async register({request, auth, response}) {

        const alias = request.input("alias")
        const full_name = request.input("full_name")
        const birth_date = request.input("birth_date")
        const country = request.input("country")
        const city = request.input("city")
        const email = request.input("email")
        const password = request.input("password")
        let user = await User.create({ 
        email: email,
        full_name :  full_name,
        birth_date : moment(birth_date, "DD/MM/YYYY").toDate(),
        country : country,
        phone:  '11111111',
        profile_pic : null,
        password: password,
        city : city,
        alias: alias,
        rol: 'user',
        created_at : moment().toDate(),
        updated_at: moment().toDate(),
        followers: [],
        following: [],
        notifications: [],
        threads: []
        });
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
        return response.json({"user" : user, "access_token": accessToken})
      }else{
      
      }

    }
    catch (e) {
      response.status(401).json({message: 'Invalid Credentials'})
    }
}
}

module.exports = AuthController
