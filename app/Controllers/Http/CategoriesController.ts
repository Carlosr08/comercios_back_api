// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Category from "App/Models/Category";

export default class CategoriesController {
  public async getCategories(){
    const categories = await Category.all()
    return {
      error: false,
      message: 'Categorias obtenidas',
      data: categories
    }
  }

  public async getCategory({request, response}){
    const name = request.param('name')
    try {
      if(!name) throw new Error('Nombre no suministrado');

      const category = await Category.findBy('name', name)
      if(!category) throw new Error('Categoria no encontrada');

      return {
        error: false,
        message: 'Categoria obtenida',
        data: category
      }      
      
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async createCategory({request, response}){
    const body = request.all()
    const trx = await Database.transaction()

    try {
      if(!body.name) throw new Error('Ingrese nombre');

      await Category.create({
        name: body.name,
        description: body.description
      },{client: trx})

      await trx.commit()

      return {
        error: false,
        message: 'Categoria Creada'
      }
    } catch (error) {
      await trx.rollback()

      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async updateCategory({request, response}){
    const body = request.all()
    const name = request.param('name')
    const trx = await Database.transaction()

    try {
      if(!body.name) throw new Error('Ingrese nombre');

      const verifyCategory = await Category.findBy('name', name)
      if(!verifyCategory) throw new Error('Categoria no encontrada');
      
      await Category.query({client: trx})
      .where('name', name)
      .update({
        name: body.name,
        description: body.description
      })

      await trx.commit()

      return {
        error: false,
        message: 'Categoria actualizada'
      }
    } catch (error) {
      await trx.rollback()

      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async deleteCategory({request, response}){
    const name = request.param('name')

    try {
      const verifyCategory = await Category.findBy('name', name)
      if(!verifyCategory) throw new Error('Categoria no encontrada');
      
      verifyCategory.delete()

      return {
        error: false,
        message: 'Categoria eliminada'
      }
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }
}
