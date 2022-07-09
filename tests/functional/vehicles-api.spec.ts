import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Vehicle from 'App/Models/Vehicle'

const mockVehicle = () => ({
	name: 'Sandero',
	description: 'carro novo barato',
	plate: 'AAA-1234',
	year: 2022,
	color: 'Vermelho',
	price: 120000,
})

const makeError = (rule: string, field: string, message: string, args?: any) => ({
	rule,
	field,
	message,
	args,
})

test.group('vehicles [GET]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should display all vehicles', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles')
		console.log(response.body())
		response.assertStatus(200)
		response.assert?.isTrue(!!response.body()[0].id)
	})
})

test.group('vehicles/store [POST]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})
	test('should return an error if some field was not sent', async ({ client }) => {
		const { year, ...params } = mockVehicle() // took out year param
		const response = await client.post('/vehicles/store').form(params)
		response.assertStatus(422)
		const ERROR_MSG = 'year é necessário para fazer o post'
		response.assertBodyContains({
			errors: [makeError('required', 'year', ERROR_MSG)],
		})
	})
	test('should return an error if year field is invalid', async ({ client }) => {
		const response = await client.post('/vehicles/store').form({ ...mockVehicle(), year: 1800 })
		response.assertStatus(422)
		const ERROR_MSG = 'O campo year deve estar entre 1900 e 2022'
		response.assertBodyContains({
			errors: [makeError('range', 'year', ERROR_MSG, { start: 1900, stop: new Date().getFullYear() })],
		})
	})
	test('should add a vehicle on success', async ({ client }) => {
		const response = await client.post('/vehicles/store').form({ ...mockVehicle() })
		response.assertStatus(200)
		const id = response.body().id
		response.assert?.isTrue(!!id)
	})
})

