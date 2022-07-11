import Route from '@ioc:Adonis/Core/Route'

// List All vehicles
Route.get('/vehicles', 'VehiclesController.index')
// List With filters vehicles
Route.get('/vehicles/filter/:color?/:year?/:price[min]?/:price[max]?', 'VehiclesController.index')

// List vehicle by id
Route.get('/vehicles/:id', 'VehiclesController.show')

// Store new vehicles
Route.post('/vehicles/store', 'VehiclesController.store')

// Update vehicles
Route.put('/vehicles/:id/update', 'VehiclesController.update')

// Delete vehicle
Route.delete('/vehicles/:id/delete', 'VehiclesController.destroy')

// Favorite or unfavorite vehicles
Route.put('/vehicles/:id/add-favorite', 'VehiclesController.addFavorite')
