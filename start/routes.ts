import Route from '@ioc:Adonis/Core/Route'

Route.get('/vehicles', 'VehiclesController.index')
Route.post('/store-vehicle', 'VehiclesController.store')
