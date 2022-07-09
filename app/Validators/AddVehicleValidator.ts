/* eslint-disable @typescript-eslint/space-before-function-paren */
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddVehicleValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		name: schema.string([rules.required()]),
		description: schema.string([rules.required()]),
		plate: schema.string([rules.required()]),
		year: schema.number([
			rules.range(1900, new Date().getFullYear()),
			rules.required(),
		]),
		color: schema.string([rules.required()]),
		price: schema.number([rules.required()]),
	})

	public messages: CustomMessages = {
		'required': '{{ field }} é necessário para fazer o post',
		'range': 'O campo {{ field }} deve estar entre {{ options.start }} e {{ options.stop }}',
	}
}
