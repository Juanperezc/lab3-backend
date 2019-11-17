'use strict'
const Publication = use('App/Models/Publication');
const PublicationLike = use('App/Models/PublicationLike');
const moment = require('moment')

class PublicationController {
    async index({ request, response }) {
        let publications = await Publication.query()
        .with('parent')
        .with('author', (builder) => {
            builder.select('full_name','photo')
        })
        .with('parent.author', (builder) => {
            builder.select('full_name','photo')
        })
        .with('commentaries')
        .with('commentaries.author', (builder) => {
            builder.select('full_name','photo')
        })
        .with('likes.author')
        .fetch()/* all().with('parent') */
       /*  await publications.loadMany(['parent']) */
        return response.json({"publications": publications})
    }

    async show({ params, response }) {
        const id = params.id;
        let publication = await Publication.find(id)
        await publication.loadMany({
         'parent.author': (builder) => builder.select('full_name','photo'),
         'author': (builder) => builder.select('full_name','photo'),
         'commentaries' : null,
         'commentaries.author' : (builder) => builder.select('full_name','photo')})
        return response.json(publication)
    }

    async like({ auth, request, params, response }) {
        const publication_id = request.input("publication_id")
        const user = await auth.getUser()
        const find = await PublicationLike
        .where('publication_id').eq(publication_id)
        .where('user_id').eq(user._id)

        const find_count = await find.count();
        console.log('find_count',find_count);
        if (find_count == null || find_count == 0){
            let publication_like = await PublicationLike.create({
                user_id : user._id,
                publication_id:  publication_id,
                created_at : moment().toDate(),
                updated_at: moment().toDate(),
            });
            await publication_like.loadMany({
                'author': (builder) => builder.select('full_name','photo'),
              })
            return response.json({"publication_like": publication_like, "action": "store"})
        }else{
            const find_first = await find.first();
            await find_first.loadMany({
                'author': (builder) => builder.select('full_name','photo'),
              })
            await find.delete();
            return response.json({"publication_like":  find_first, "action": "delete"})
        }
    }
    async share({ auth, request, params, response }) {
        const publication_id = request.input("publication_id")

        let publication_share = await Publication.create({
                type: 'multimedia/post',
                parent_id: publication_id,
                title: null,
                body: null,
                photo : null,/*  */
                category: null,
                created_at : moment().toDate(),
                updated_at: moment().toDate(),
        })

        await publication_share.loadMany({
            'parent.author': (builder) => builder.select('full_name','photo'),
            'author': (builder) => builder.select('full_name','photo'),
            'commentaries' : null,
            'commentaries.author' : (builder) => builder.select('full_name','photo')})

        return response.json({"publication": publication_share})

    }
}

module.exports = PublicationController
