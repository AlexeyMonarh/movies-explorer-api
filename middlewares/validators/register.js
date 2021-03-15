const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  notValidEmail,
  min,
  max,
  requiredField,
} = require('../../config/constants');

const register = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': min,
      'string.max': max,
    }),
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helper.message(notValidEmail);
      })
      .messages({ 'any.required': requiredField }),
    password: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': min,
        'string.max': max,
        'any.required': requiredField,
      }),
  },
});

module.exports = register;
