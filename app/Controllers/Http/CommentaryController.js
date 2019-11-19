'use strict'
const Commentary = use('App/Models/Commentary');
const CommentaryLike = use('App/Models/CommentaryLike');
const moment = require('moment')

class CommentaryController {

    async store({auth, request, response}){
        const user = await auth.getUser()
        const publication_id = request.input("publication_id")
        const body = request.input("body")
        let commentary = await Commentary.create({
          publication_id: publication_id,
          user_id: user._id,
          body :  body,
          parent_id: null,
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
        });
        await commentary.loadMany({
          'author': (builder) => builder.select('full_name','photo'),
          'likes.author': (builder) => builder.select('full_name','photo')})
        return response.json({"commentary": commentary})
    }

    async like({ auth, request, params, response }) {
      const commentary_id = request.input("commentary_id")
      const user = await auth.getUser()
      const find = await CommentaryLike
      .where('commentary_id').eq(commentary_id)
      .where('user_id').eq(user._id)
      const find_count = await find.count();
      console.log('find_count',find_count);
      if (find_count == null || find_count == 0){
      let commentary_like = await CommentaryLike.create({
        user_id : user._id,
        commentary_id:  commentary_id,
        created_at : moment().toDate(),
        updated_at: moment().toDate(),
      })
      await commentary_like.loadMany({
        'author': (builder) => builder.select('full_name','photo'),
      })
      return response.json({"commentary_like": commentary_like, "action": "store"})
    }else{
      const find_first = await find.first();
      await find_first.loadMany({
          'author': (builder) => builder.select('full_name','photo'),
        })
      await find.delete();
      return response.json({"commentary_like":  find_first, "action": "delete"})
    }
  }

}

module.exports = CommentaryController
