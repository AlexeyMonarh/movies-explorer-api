const { celebrate, Joi } = require('celebrate');
const { lengthSymbol, hexSystem } = require('../../config/constants');

const id = celebrate({
  params: {
    _id: Joi.string().required().length(24).hex()
      .messages({
        'string.length': lengthSymbol,
        'string.hex': hexSystem,
      }),
  },
});

module.exports = id;
