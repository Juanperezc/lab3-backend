'use strict'
const User = use('App/Models/User');
const Helpers = use('Helpers');
const Env = use('Env')
class UserController {

    async index({ request, response }) {
        let users = await User.query().with('publications').fetch()
        return response.json({"users": users})
    }
        async show({ request, response }) {
        let users = await User.query().with('publications').fetch()
        return response.json({"users": users})
    }

    async me({ auth, response }) {
        try {
            const user = await auth.getUser()
            const user_model = await User.find(user._id)
            await user_model.loadMany(['publications'])
          //  return response.json({"user": user_model})
            return response.json({"user": user_model})
          } catch (error) {
            return response.status(500).json({error: error})
            /* response.status(500).json(error); */
          }

    }
    async update({ params, request, auth, response }) {
      try {
          const user_id = params.id;
          const full_name = request.input("full_name")
          const phone = request.input("phone")
          const user_model = await User.find(user_id)
          user_model.full_name = full_name;
          user_model.phone = phone;
          await user_model.save();
          await user_model.loadMany(['publications'])
        //  return response.json({"user": user_model})
          return response.json({"user": user_model})
        } catch (error) {
          return response.status(500).json({error: error})
          /* response.status(500).json(error); */
        }

  }

    async upload_photo({request,  auth, response }) {
    //  new Date().getTime() + '.' profilePic.subtype
        const profilePic = request.file('file', {
          types: ['image'],
          size: '2mb'
        })
       let photo_name =  profilePic.clientName;
        await profilePic.move(Helpers.publicPath
        ('uploads/profile'), {
          name: photo_name,
          overwrite: true
        })
        if (!profilePic.moved()) {
          return response.status(500).json({error: profilePic.error()})
        }

        const user = await auth.getUser()
        const user_model = await User.find(user._id)
        user_model.photo = Env.get('APP_URL') + '/uploads/profile/' + photo_name;
        await  user_model.save();

        return response.json({"user": user_model})
      
    
    /*       const user = await auth.getUser()
          const user_model = await User.find(user._id)
          await user_model.loadMany(['publications'])
        //  return response.json({"user": user_model})
          return response.json({"user": user_model}) */
        

  }

}

module.exports = UserController
