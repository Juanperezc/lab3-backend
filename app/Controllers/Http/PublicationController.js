'use strict'
const Publication = use('App/Models/Publication');

class PublicationController {
    async index({ request, response }) {

  
        let publications = await Publication.all()
        return response.json({"publications": publications})
    }

    async show({ params, response }) {
        const id = params.id;
        let publication = await Publication.find(id);
        return response.json(publication)
    }

    async publication_like({ params, response }) {
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
