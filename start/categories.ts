import Route from '@ioc:Adonis/Core/Route'

Route.get('categories','CategoriesController.getCategories')
Route.get('category/:name','CategoriesController.getCategory')
Route.post('category','CategoriesController.createCategory')
Route.put('category/:name','CategoriesController.updateCategory')
Route.delete('category/:name','CategoriesController.deleteCategory')