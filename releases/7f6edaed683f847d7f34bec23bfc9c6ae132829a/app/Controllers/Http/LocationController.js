'use strict'
const Country = use('App/Models/Country');
class LocationController {

    async index({ request, response }) {

  
        let countries = await Country.all()
        return response.json({"countries": countries})
    }

        async show({ params, response }) {
           const id = params.id;
           let country = await Country.find(id);
            return response.json(country)
        }
}

module.exports = LocationController
