# ✨Middy Sparks Joi
Middy Sparks Joi is a middleware for `@middy/core`. It validates incoming requests, and if an item does not spark joi we thank it and throw an exception.

![https://media.giphy.com/media/uWzDsAsRm2X9qULHLs/giphy.gif](https://media.giphy.com/media/uWzDsAsRm2X9qULHLs/giphy.gif)

## Getting Started
First, run `yarn add middy-sparks-joi @hapi/joi` or `npm i middy-sparks-joi @hapi/joi` in your project directory. Then in your lambda handler:

```javascript
const middy = require('@middy/core')

// These middlewares are recommended
const jsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')

const Joi = require('@hapi/joi');
const validator = require('middy-sparks-joi')

const schema = Joi.object({
    body: Joi.object({
      creditCardNumber: Joi.string().creditcard(),
      expiryMonth: Joi.date().required(),
      expiryYear: Joi.date().required(),
      cvc: Joi.number().integer().required(3),
      nameOnCard: Joi.alphanum().required()
      amount: Joi.number().required()
    }).required()
});

const processPayment = (event, context, callback) => {
 // you don't need to validate the event, the schema you passed to middy-sparks-joi does that for you.
 const { creditCardNumber, expiryMonth, expiryYear, cvc, nameOnCard, amount } = event.body

 // do stuff with this data
 // ...

 return callback(null, { result: 'success', message: 'payment processed correctly'})
}

module.exports = {
  handler: middy(processPayment)
    .use(httpErrorHandler())
    .use(jsonBodyParser())
    .use(validator({
      schema: ...,
      options: {}
    })
}
```
That's it! Middy Sparks Joi protects you from inputs that don't spark joi ✨

## Building Joi Schemas

The docs for joi can be found here https://hapi.dev/family/joi/api this is 
