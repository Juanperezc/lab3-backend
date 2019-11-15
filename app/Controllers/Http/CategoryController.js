'use strict'
const Categoria = use('App/Models/Category');

class CategoryController {
   //Listar Categorias
    async index({ request, response }) {
        const cat = await Categoria.all();
        return response.json({"categorias": cat})
    }
    //buscar categoria x id
    async show({params, request, response}){
        const id = params.id;
        const cat = await Categoria.find(id)

        return response.json({"categoria": cat});
    }
    //Crear una categoria
    async store({request, response}){
        const cat = request.body;
        if(cat.name.length  && cat.status)
            Categoria.create(cat)

        return response.json({"category": cat})
    }
    //Eliminar categoria x id
    async destroy({params,request,response}){
        const id = params.id;
        const cat = await Categoria.find(id);

        cat.delete();

        return response.json({"category": cat})
    }
    //editar una categoria
    async update({params,request,response}){
        const id = params.id;
        const cat = await Categoria.find(id);

        const name = request.body.name;

        cat.name = name;

        cat.save();

        return response.json({"category": cat})
    }

}

module.exports = CategoryController