const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  notValidEmail,
  minSymbol,
  maxSymbol,
  requiredField,
} = require('../../config/constants');

const login = celebrate({
  body: {
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
        'string.min': minSymbol,
        'string.max': maxSymbol,
        'any.required': requiredField,
      }),
  },
});

module.exports = login;
