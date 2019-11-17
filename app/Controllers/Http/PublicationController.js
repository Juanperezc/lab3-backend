'use strict'
const Publication = use('App/Models/Publication');

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

    async publication_like({ params, response }) {
        const id = params.id;
        let publication = await Publication.find(id);
        return response.json(publication)
    }

    async commentaries ({ params, response }) {
        const id = params.id;
        let publication = await Publication.find(id);
        return response.json(publication)
    }

    async commentary_like ({ params, response }) {
        const id = params.id;
        let publication = await Publication.find(id);
        return response.json(publication)
    }
}

module.exports = PublicationController
