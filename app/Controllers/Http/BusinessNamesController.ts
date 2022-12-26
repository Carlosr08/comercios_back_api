// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BusinessName from "App/Models/BusinessName"
import Database from "@ioc:Adonis/Lucid/Database"


export default class BusinessNamesController {
    public async getBusinessNames() {
        const businessnames = await BusinessName.query()
        return {
            error: false,
            message: 'Razones Sociales',
            data: businessnames,
        }
    }
    public async getBusinessName({ request, response }) {
        const name = request.param('name')
        try {
            if (!name) throw new Error('Nombre no suministrado');

            const businessname = await BusinessName.findBy('name', name)
            if (!businessname) throw new Error('Razon social no encontrado');

            return {
                error: false,
                message: 'Razon social obtenida',
                data: businessname
            }

        } catch (error) {
            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }
    public async createBusinessName({ request, response }) {
        const body = request.all()
        const trx = await Database.transaction()

        try {
            if (!body.name) throw new Error('Ingrese nombre');

            await BusinessName.create({
                name: body.name,


            }, { client: trx })

            await trx.commit()

            return {
                error: false,
                message: 'Razon social Creado'
            }
        } catch (error) {
            await trx.rollback()

            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }
    public async updateBusinessName({ request, response }) {
        const body = request.all()
        const name = request.param('name')
        const trx = await Database.transaction()

        try {
            if (!body.name) throw new Error('Ingrese nombre');

            const verifyBusinessName = await BusinessName.findBy('name', name)
            if (!verifyBusinessName) throw new Error('Razon social no encontrada');

            await BusinessName.query({ client: trx })
                .where('name', name)
                .update({
                    name: body.name
                })

            await trx.commit()

            return {
                error: false,
                message: 'Razon social actualizado'
            }
        } catch (error) {
            await trx.rollback()

            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }
    public async deleteBusinessName({ request, response }) {
        const name = request.param('name')

        try {
            const verifyBusinessName = await BusinessName.findBy('name', name)
            if (!verifyBusinessName) throw new Error('Razon social no encontrado');

            verifyBusinessName.delete()

            return {
                error: false,
                message: 'Razon social eliminado'
            }
        } catch (error) {
            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }
}
