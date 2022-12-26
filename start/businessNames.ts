import Route from '@ioc:Adonis/Core/Route'

Route.get('businessnames', 'BusinessNamesController.getBusinessNames')
Route.get('businessname/:name', 'BusinessNamesController.getBusinessName')
Route.post('businessname', 'BusinessNamesController.createBusinessName')
Route.put('businessname/:name', 'BusinessNamesController.updateBusinessName')
Route.delete('businessname/:name', 'BusinessNamesController.deleteBusinessName')