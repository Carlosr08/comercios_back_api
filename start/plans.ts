import Route from '@ioc:Adonis/Core/Route'

Route.get('plans', 'PlansController.getPlans')
Route.get('plan/:name', 'PlansController.getPlan')
Route.post('plan', 'PlansController.createPlan')
Route.put('plan/:name', 'PlansController.updatePlan')
Route.delete('plan/:name', 'PlansController.deletePlan')
