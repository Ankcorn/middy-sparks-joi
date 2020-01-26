const validator = require('../src')
const Joi = require('@hapi/joi')
const { endpoint, createEvent } = require('./utils')

describe('Validator', () => {
	it('If the schema is not a valid Joi schema then an exception is thrown', () => {
		const schema = {}
		expect(() => endpoint().use(validator({ schema }))).toThrow(
			Error('The schema is not valid'),
		)
	})

	it('If the input matches the schema then we get a 200 response', () => {
		return new Promise(done => {
			const schema = Joi.object({ body: Joi.string().required() })
			const event = createEvent()

			endpoint(event, data => {
				expect(data).toBe(200)
				done()
			}).use(validator({ schema }))
		})
	})
})
