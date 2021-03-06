'use strict'
const User = use('App/Models/User');
const Helpers = use('Helpers');
const Env = use('Env')

class UserController {

    async index({ request, auth, response }) {
      const user = await auth.getUser()
        const users = await User.query()
        .with('publications.parent')
        .where('_id').ne(user._id).fetch()
        return response.json({"users": users})
    }

    async show({params, request, response }) {
     const user_id = params.id;
     let user = await User.find(user_id);
     await user.loadMany({
      'publications.parent.author': (builder) => builder.select('full_name','photo'),
      'publications.author': (builder) => builder.select('full_name','photo'),
      'publications.commentaries.author': (builder) =>  builder.select('full_name','photo'),
      'publications.commentaries.likes.author' : (builder) => builder.select('full_name','photo'),
      'publications.likes.author' : (builder) => builder.select('full_name','photo')});
       return response.json({"user": user})
    }

    async me({ auth, response }) {
        try {
            const user = await auth.getUser()
            const user_model = await User.find(user._id)
            await user_model.loadMany({
             'publications.parent.author': (builder) => builder.select('full_name','photo'),
             'publications.author': (builder) => builder.select('full_name','photo'),
             'publications.commentaries.author' : (builder) => builder.select('full_name','photo'),
             'publications.likes.author' : (builder) => builder.select('full_name','photo')})
            return response.json({"user": user_model})
          } catch (error) {
            return response.status(500).json({error: error})
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

  }

  async banned({request, response, params}){
      const id = params.id
      const user = await User.find(id);

      user.status = user.status === 'Active' ? 
                    'Banned' : 'Active';
      await user.save();

      return response.json({"user" : user});
  }

  async getUser({params, request, response}){
      const id = params.id
      const user = await User.find(id);
      try {
        await user.loadMany(['publications']) 
      }
      catch (error) {
       // return  Promise.reject(error)
       console.log("error getuser backen")
       return response.status(500).json({error: error})
      }
    return response.json({"user" : user});
  }
}

module.exports = UserController
