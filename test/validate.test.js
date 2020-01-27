const validator = require('../src')
const Joi = require('@hapi/joi')
const middy = require('@middy/core')
const createError = require('http-errors')
const { invoke } = require('./utils')

describe('Validator', () => {
	it('If the schema is not a valid Joi schema then an exception is thrown', () => {
		const schema = {}
		const originalHandler = jest.fn((event, context, cb) => {
			cb(null, event)
		})
		expect(() => middy(originalHandler).use(validator({ schema }))).toThrow(
			Error('The schema is not valid'),
		)
		expect(originalHandler).toBeCalledTimes(0)
	})

	it('If the input does not match the schema then we get a Bad input error', async () => {
		const schema = Joi.object({ body: Joi.string().required() })
		const originalHandler = jest.fn((event, context, cb) => {
			cb(null, event)
		})
		const handler = middy(originalHandler).use(validator({ schema }))

		await expect(
			invoke(handler, { body: 'hi', pathParameters: { id: '1234' } }),
		).rejects.toEqual(createError.BadRequest('Event object failed validation'))
		expect(originalHandler).toBeCalledTimes(0)
	})

	it('If the input matches the schema then we get a 200 response', async () => {
		const schema = Joi.object({ body: Joi.string().required() })
		const originalHandler = jest.fn((event, context, cb) => {
			cb(null, event)
		})
		const handler = middy(originalHandler).use(validator({ schema }))

		const response = await invoke(handler, { body: 'hi' })
		expect(response).toStrictEqual({
			body: 'hi',
		})
		expect(originalHandler).toBeCalledTimes(1)
	})
})
