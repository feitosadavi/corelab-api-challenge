import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import AddVehicleValidator from 'App/Validators/AddVehicleValidator'
import UpdateVehicleValidator from 'App/Validators/UpdateVehicleValidator'

export default class VehiclesController {
	public async index (_ctx: HttpContextContract) {
		const vehicles = await Vehicle.all()
		return vehicles
	}
	public async show ({ params }: HttpContextContract) {
		const vehicles = await Vehicle.findBy('id', params.id)
		if (vehicles) {
			return vehicles
		} else {
			return 'Nenhum veículo encontrado'
		}
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
	public async update ({ request, params }: HttpContextContract) {
		const payload = await request.validate(UpdateVehicleValidator)
		const vehicle = await Vehicle.findOrFail(params.id)
		// store request data values to vehicle model
		for (const field of Object.keys(payload)) {
			vehicle[field] = payload[field]
		}
		const result = await vehicle.save()
		return { id: result.id }
	}
	public async destroy ({ params, response }: HttpContextContract) {
		await Vehicle.query().where('id', params.id).delete()
		response.status(204)
	}
}
