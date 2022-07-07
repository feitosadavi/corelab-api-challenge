import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IVehicle } from 'App/Types/Vehicle'
import StorePostValidator from 'App/Validators/StorePostValidator'

export default class VehiclesController {
	public async index (_ctx: HttpContextContract) {
		const vehicles: IVehicle[] = [
			{
				id: 1,
				name: 'First Vehicle',
				description: 'This is a description of first vehicle',
				plate: 'DDT-0012',
				isFavorite: false,
				year: 2018,
				color: '#ff00ff',
				price: 22000,
				createdAt: new Date(),
			},
		]

		return vehicles
	}
	public async store ({ request }: HttpContextContract) {
		await request.validate(StorePostValidator)
		return { ok: true }
	}
}
