const { celebrate, Joi } = require('celebrate');

const id = celebrate({
  params: {
    _id: Joi.string()
      .required()
      .min(2)
      .max(30)
      .hex()
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'string.hex': 'Не соответствует системе исчисления',
      }),
  },
});

module.exports = id;
