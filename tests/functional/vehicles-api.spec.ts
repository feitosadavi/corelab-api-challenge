import { test } from '@japa/runner'

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

test.group('vehicles [GET]', (_group) => {
	test('display vehicles', async ({ client }) => {
		const response = await client.get('/vehicles')

		response.assertStatus(200)
		response.assertBodyContains([
			{
				id: 1,
				name: 'First Vehicle',
				description: 'This is a description of first vehicle',
				plate: 'DDT-0012',
				isFavorite: false,
				year: 2018,
				color: '#ff00ff',
				price: 22000,
			},
		])
	})
})

test.group('store-vehicle [POST]', (_group) => {
	test('should return an error if some field was not sent', async ({ client }) => {
		const { year, ...params } = mockVehicle()
		const response = await client.post('/store-vehicle').form(params)
		console.log(response.body())
		response.assertStatus(422)
		const ERROR_MSG = 'year é necessário para fazer o post'
		response.assertBodyContains({
			errors: [makeError('required', 'year', ERROR_MSG)],
		})
	})

	test('should return an error if year field is invalid', async ({ client }) => {
		const response = await client.post('/store-vehicle').form({ ...mockVehicle(), year: 1800 })
		console.log(response.body())
		response.assertStatus(422)
		const ERROR_MSG = 'O campo year deve estar entre 1900 e 2022'
		response.assertBodyContains({
			errors: [makeError('range', 'year', ERROR_MSG, { start: 1900, stop: new Date().getFullYear() })],
		})
	})
})

