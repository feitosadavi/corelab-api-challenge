import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import AddVehicleValidator from 'App/Validators/AddVehicleValidator'

export default class VehiclesController {
	public async index (_ctx: HttpContextContract) {
		const vehicles = await Vehicle.all()
		return vehicles
	}
	public async store ({ request }: HttpContextContract) {
		const payload = await request.validate(AddVehicleValidator)
		const vehicle = new Vehicle()
		// store request data values to vehicle model
		for (const field of Object.keys(payload)) {
			vehicle[field] = payload[field]
		}
		const result = await vehicle.save()
		return { id: result.id }
	}
}
