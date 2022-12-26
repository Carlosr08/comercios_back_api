// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Plan from "App/Models/Plan";


export default class PlansController {
    public async getPlans() {
        const plans = await Plan.query()
        return {
            error: false,
            message: 'Planes',
            data: plans,
        }
    }

    public async getPlan({ request, response }) {
        const name = request.param('name')
        try {
            if (!name) throw new Error('Nombre no suministrado');

            const plan = await Plan.findBy('name', name)
            if (!plan) throw new Error('Plan no encontrado');

            return {
                error: false,
                message: 'Plan obtenido',
                data: plan
            }

        } catch (error) {
            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }

    public async createPlan({ request, response }) {
        const body = request.all()
        const trx = await Database.transaction()

        try {
            if (!body.name) throw new Error('Ingrese nombre');

            await Plan.create({
                name: body.name,
                price: body.price,
                description: body.description

            }, { client: trx })

            await trx.commit()

            return {
                error: false,
                message: 'Plan Creado'
            }
        } catch (error) {
            await trx.rollback()

            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }
    public async updatePlan({ request, response }) {
        const body = request.all()
        const name = request.param('name')
        const trx = await Database.transaction()

        try {
            if (!body.name) throw new Error('Ingrese nombre');

            const verifyPlan = await Plan.findBy('name', name)
            if (!verifyPlan) throw new Error('Plan no encontrada');

            await Plan.query({ client: trx })
                .where('name', name)
                .update({
                    name: body.name,
                    price: body.price,
                    description: body.description
                })

            await trx.commit()

            return {
                error: false,
                message: 'Plan actualizado'
            }
        } catch (error) {
            await trx.rollback()

            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }
    public async deletePlan({ request, response }) {
        const name = request.param('name')

        try {
            const verifyPlan = await Plan.findBy('name', name)
            if (!verifyPlan) throw new Error('Plan no encontrado');

            verifyPlan.delete()

            return {
                error: false,
                message: 'Plan eliminado'
            }
        } catch (error) {
            return response.badRequest({
                error: true,
                message: error.message
            })
        }
    }
}
