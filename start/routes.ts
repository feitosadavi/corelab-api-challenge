import Route from '@ioc:Adonis/Core/Route'

// List All vehicles
Route.get('/vehicles', 'VehiclesController.index')

// Store new vehicles
Route.post('/vehicles/store', 'VehiclesController.store')
