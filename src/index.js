const createError = require('http-errors')
const Joi = require('@hapi/joi')

module.exports = ({ schema, options }) => {
	if (!Joi.isSchema(schema)) {
		console.log(
			'[middy-sparks-joi] The schema you provided is not a valid Joi schema',
		)
		throw new Error('The schema is not valid')
	}
	return {
		before: (handler, next) => {
			const event = handler.event
			const { error: validationFailure } = schema.validate(event, options)

			if (validationFailure) {
				const error = new createError.BadRequest(
					'Event object failed validation',
				)
				handler.event.headers = Object.assign({}, handler.event.headers)
				error.details = validationFailure.details
				throw error
			}
			return next()
		},
	}
}
