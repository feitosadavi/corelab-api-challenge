import Route from '@ioc:Adonis/Core/Route'

Route.get('/vehicles', 'VehiclesController.index')
Route.post('/add-vehicle', 'VehiclesController.store')
