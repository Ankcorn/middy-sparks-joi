const middy = require('@middy/core')
const jsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')

function endpoint() {
	return middy(event => ({ body: JSON.stringify(event), statusCode: 200 }))
		.use(httpErrorHandler())
		.use(jsonBodyParser())
}

function createEvent(body, params, query) {
	return {
		body: JSON.stringify(body),
		queryStringParameters: query,
		pathParameters: params,
	}
}

module.exports = {
	endpoint,
	createEvent,
}
