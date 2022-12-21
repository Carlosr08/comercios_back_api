import Route from '@ioc:Adonis/Core/Route'
// import User from 'App/Models/User'
import './categories'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login', 'AuthController.login')
Route.post('logout', 'AuthController.logout')
Route.get('login/:provider', 'AuthController.loginProvider')

// Route.get('/google', async ({ ally }) => {
//   return ally.use('google').redirect()
//   // const google = ally.use('google')
//   // const googleUser = await google.user()
//   // const user = await User.firstOrCreate({
//   //   email: googleUser.email,
//   // }, {
//   //   name: googleUser.name,
//   //   accessToken: googleUser.token.token,
//   //   isVerified: googleUser.emailVerificationState === 'verified'
//   // })
//   // await auth.use('api').login(user)
//   // return google.user()
// })