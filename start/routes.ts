import Route from '@ioc:Adonis/Core/Route'

// List All vehicles
Route.get('/vehicles', 'VehiclesController.index')

// List vehicle by id
Route.get('/vehicles/:id', 'VehiclesController.show')

// Store new vehicles
Route.post('/vehicles/store', 'VehiclesController.store')
