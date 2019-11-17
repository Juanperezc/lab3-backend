'use strict'
const Commentary = use('App/Models/Commentary');
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
        await commentary.loadMany({'author': (builder) => builder.select('full_name','photo')})
        return response.json({"commentary": commentary})
    }

}

module.exports = CommentaryController
