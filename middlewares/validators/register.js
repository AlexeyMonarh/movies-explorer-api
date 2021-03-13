const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимум 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helper.message('Невалидный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Обязательное поле',
      }),
  },
});

module.exports = register;