'use strict'
const Commentary = use('App/Models/Commentary');


class CommentaryController {

    async store({auth, request, response}){
        const user = await auth.getUser()
        const publication_id = request.input("publication_id")
        const body = request.input("body")

        /*  const data = request.body;
        let cat = null;
        if(data.name.length  && data.status)
          cat =  await Categoria.create(data)
        return response.json({"category": cat}) */

        return response.json({"publication_id": publication_id})
    }

}

module.exports = CommentaryController
