// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, response, auth }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return {
        error: false,
        message: 'Inicio exitoso',
        data: token
      }
    } catch {
      return response.unauthorized({
        error: true,
        message: 'Datos invalidos'
      })
    }
  }

  public async loginProvider({ request, ally }) {
    const providers = request.param('provider')
    const provider = ally.use(providers)
    console.log(provider)
    return provider
    // return ally.use(`${provider}`).redirect()
  }

  public async logout({ auth, response }) {
    try {
      await auth.use('api').revoke()
      return {
        error: false,
        message: 'Fin sesión'
      }
    } catch (error) {
      return response.badRequest({
        error: true,
        message: error.message
      })
    }
  }
}
