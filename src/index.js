const Joi = require('@hapi/joi')

const defaults = {}
module.exports = ({ schema, options}) => {
  const settings = { ...defaults, ...options}
  return {
    before(handler, next) {
      return next()
    },
  }
}
