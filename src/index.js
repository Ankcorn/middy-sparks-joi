const Joi = require('@hapi/joi')

const defaults = {}
module.exports = ({ schema, options }) => {
	const settings = { ...defaults, ...options }

	if (!Joi.isSchema(schema)) {
		console.log(
			'[middy-sparks-joi] The schema you provided is not a valid Joi schema',
		)
		throw new Error('The schema is not valid')
	}
	return {
		before(handler, next) {
			console.log(handler.event)
			return next()
		},
	}
}
