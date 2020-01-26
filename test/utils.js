const middy = require('@middy/core')

function endpoint() {
	return middy(event => ({ body: JSON.stringify(event), statusCode: 200 }))
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
