const validator = require('../src')
const Joi = require('@hapi/joi')
const { endpoint, createEvent } = require('./utils')

describe('Validator', () => {
	it('returns 400 if their the input does not match the schema', () => {
		const schema = Joi.object()
		const handler = endpoint().use(validator({ schema }))
		const event = createEvent({}, {}, {})

		const response = handler(event)

		expect(response.statusCode).toBe(200)
	})
})
