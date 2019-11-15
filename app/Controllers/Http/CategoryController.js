'use strict'
const Categoria = use('App/Models/Category');

class CategoryController {
   
    async index({ request, response }) {
        const cat = await Categoria.all();
        return response.json({"categorias": cat})
    }
}

module.exports = CategoryController