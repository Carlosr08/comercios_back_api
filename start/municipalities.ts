import Route from '@ioc:Adonis/Core/Route'

Route.get('municipalities','MunicipalitiesController.getMunicipalities')
Route.get('municipality/:name','MunicipalitiesController.getMunicipality')
Route.get('municipalities_from_state/:name','MunicipalitiesController.getMunicipalityFromState')
Route.post('municipality','MunicipalitiesController.createMunicipality')
Route.put('municipality/:name','MunicipalitiesController.updateMunicipality')
Route.delete('municipality/:name','MunicipalitiesController.deleteMunicipality')