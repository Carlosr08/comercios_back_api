// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Municipality from "App/Models/Municipality";
import State from "App/Models/State";

export default class MunicipalitiesController {
  public async getMunicipalities(){
    const municipalitiesQuery = await Municipality.query().preload('states')

    const municipalities = municipalitiesQuery.map((municipality)=>{
      const {id, name} = municipality
      const {name: state} = municipality?.states
      return {
        id, name, state
      }
    })

    return {
      error: false,
      message: 'Municipios obtenidos',
      data: municipalities
    }
  }

  public async getMunicipality({request, response}){
    const name = request.param('name')
    try {
      if(!name) throw new Error('Nombre no suministrado');

      const municipality = await Municipality.findBy('name', name)
      if(!municipality) throw new Error('Municipio no encontrado');

      return {
        error: false,
        message: 'Municipio obtenido',
        data: municipality
      }      
      
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async getMunicipalityFromState({request, response}){
    const name = request.param('name')
    try {
      if(!name) throw new Error('Nombre no suministrado');

      const state = await State.findBy('name', name)
      if(!state) throw new Error('Estado no encontrado');

      const municipalities = await Municipality.query().where('state_id', state.id).select('id','name')

      return {
        error: false,
        message: 'Municipios obtenidos',
        data: municipalities
      }
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async createMunicipality({request, response}){
    const body = request.all()
    const trx = await Database.transaction()

    try {
      if(!body.name) throw new Error('Ingrese nombre');

      await Municipality.create({
        name: body.name,
        stateId: body.state_id
      },{client: trx})

      await trx.commit()

      return {
        error: false,
        message: 'Municipio Creado'
      }
    } catch (error) {
      await trx.rollback()

      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async updateMunicipality({request, response}){
    const body = request.all()
    const name = request.param('name')
    const trx = await Database.transaction()

    try {
      if(!body.name) throw new Error('Ingrese nombre');

      const verifyMunicipality = await Municipality.findBy('name', name)
      if(!verifyMunicipality) throw new Error('Municipio no encontrado');
      
      await Municipality.query({client: trx})
      .where('name', name)
      .update({
        name: body.name,
        description: body.description
      })

      await trx.commit()

      return {
        error: false,
        message: 'Municipio actualizado'
      }
    } catch (error) {
      await trx.rollback()

      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }

  public async deleteMunicipality({request, response}){
    const name = request.param('name')

    try {
      const verifyMunicipality = await Municipality.findBy('name', name)
      if(!verifyMunicipality) throw new Error('Municipio no encontrado');
      
      verifyMunicipality.delete()

      return {
        error: false,
        message: 'Municipio eliminado'
      }
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }
}
