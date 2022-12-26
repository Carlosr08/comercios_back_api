// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import State from "App/Models/State"

export default class StatesController {
  public async getStates(){
    const states = await State.all()
    return {
      error: false,
      message: 'Estados obtenidos',
      data: states
    }
  }

  public async getState({request, response}){
    const name = request.param('name')
    try {
      if(!name) throw new Error('Nombre no suministrado');

      const state = await State.findBy('name', name)
      if(!state) throw new Error('Estado no encontrado');

      return {
        error: false,
        message: 'Estado obtenido',
        data: state
      }      
      
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async createState({request, response}){
    const body = request.all()
    const trx = await Database.transaction()

    try {
      if(!body.name) throw new Error('Ingrese nombre');

      await State.create({
        name: body.name,
      },{client: trx})

      await trx.commit()

      return {
        error: false,
        message: 'Estado Creado'
      }
    } catch (error) {
      await trx.rollback()

      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async updateState({request, response}){
    const body = request.all()
    const name = request.param('name')
    const trx = await Database.transaction()

    try {
      if(!body.name) throw new Error('Ingrese nombre');

      const verifyState = await State.findBy('name', name)
      if(!verifyState) throw new Error('Estado no encontrado');
      
      await State.query({client: trx})
      .where('name', name)
      .update({
        name: body.name,
        description: body.description
      })

      await trx.commit()

      return {
        error: false,
        message: 'Estado actualizado'
      }
    } catch (error) {
      await trx.rollback()

      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async deleteState({request, response}){
    const name = request.param('name')

    try {
      const verifyState = await State.findBy('name', name)
      if(!verifyState) throw new Error('Estado no encontrado');
      
      verifyState.delete()

      return {
        error: false,
        message: 'Estado eliminado'
      }
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }
}
