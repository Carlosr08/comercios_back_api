import Route from '@ioc:Adonis/Core/Route'

Route.get('municipalities','MunicipalitiesController.getMunicipalities')
Route.get('municipalities_from_state/:name','MunicipalitiesController.getMunicipalityFromState')
Route.post('municipality','MunicipalitiesController.createMunicipality')