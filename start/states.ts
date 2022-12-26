import Route from '@ioc:Adonis/Core/Route'

Route.get('states','StatesController.getStates')
Route.get('state/:name','StatesController.getState')
Route.post('state','StatesController.createState')
Route.put('state/:name','StatesController.updateState')
Route.delete('state/:name','StatesController.deleteState')