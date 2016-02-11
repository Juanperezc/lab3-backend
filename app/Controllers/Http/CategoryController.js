'use strict'
const Categoria = use('App/Models/Category');

class CategoryController {
   //Listar Categorias -> /categorys 
    async index({ request, response }) {
        const cat = await Categoria.all();
        return response.json({"categorias": cat})
    }
    //buscar categoria x id-> /categorys/:id 
    async show({params, request, response}){
        const id = params.id;
        const cat = await Categoria.find(id)

        return response.json({"categoria": cat});
    }
    //Crear una categoria -> /categorys
    async store({request, response}){
        const data = request.body;
        let cat = null;

        if(data.name.length  && data.status)
          cat =  await Categoria.create(data)

        return response.json({"category": cat})
    }
    //Eliminar categoria x id -> /categorys/:id 
    async destroy({params,request,response}){
        const id = params.id;
        const cat = await Categoria.find(id);

        cat.delete();

        return response.json({"category": cat})
    }
    
    //editar una categoria -> /categorys/:id 
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