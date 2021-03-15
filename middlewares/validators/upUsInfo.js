const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  notValidEmail,
  minSymbol,
  maxSymbol,
  requiredField,
} = require('../../config/constants');

const upUsInfo = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': minSymbol,
        'string.max': maxSymbol,
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
  },
});

module.exports = upUsInfo;
