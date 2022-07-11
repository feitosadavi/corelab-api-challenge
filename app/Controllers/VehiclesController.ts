import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import AddVehicleValidator from 'App/Validators/AddVehicleValidator'
import UpdateVehicleValidator from 'App/Validators/UpdateVehicleValidator'
import AddFavoriteValidator from 'App/Validators/AddFavoriteValidator'

type Price = {
	min: number,
	max: number
}
type Filters = {
	price: Price
} | undefined

export default class VehiclesController {
	public async index ({ request }: HttpContextContract) {
		const filters: Filters = request.qs() as Filters
		let between: [any, any] = [0, 999999999999999]
		if (filters) {
			const { price } = filters
			between = (filters.price ? [price.min, price.max].map(e => Number(e)) : between) as [any, any]
		}
		const vehicles = await Vehicle.query().whereBetween('price', between)
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
	public async addFavorite ({ request, response, params }: HttpContextContract) {
		const { isFavorite } = await request.validate(AddFavoriteValidator)
		const vehicle = await Vehicle.findOrFail(params.id)
		vehicle.isFavorite = isFavorite
		await vehicle.save()
		response.status(204)
	}
}
