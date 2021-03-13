const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const upUsInfo = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
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
  },
});

module.exports = upUsInfo;
