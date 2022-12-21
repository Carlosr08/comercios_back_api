import Route from '@ioc:Adonis/Core/Route'
// import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch {
    return response.unauthorized('Invalid credentials')
  }
})

Route.post('/logout', async ({ auth }) => {
  await auth.use('api').revoke()
  return {
    revoked: true
  }
})

Route.get('/google', async ({ ally }) => {
  return ally.use('google').redirect()
  // const google = ally.use('google')
  // const googleUser = await google.user()
  // const user = await User.firstOrCreate({
  //   email: googleUser.email,
  // }, {
  //   name: googleUser.name,
  //   accessToken: googleUser.token.token,
  //   isVerified: googleUser.emailVerificationState === 'verified'
  // })
  // await auth.use('api').login(user)
  // return google.user()
})