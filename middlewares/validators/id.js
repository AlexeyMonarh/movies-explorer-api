const { celebrate, Joi } = require('celebrate');
const { length, hex } = require('../../config/constants');

const id = celebrate({
  params: {
    _id: Joi.string().required().length(24).hex()
      .messages({
        'string.length': length,
        'string.hex': hex,
      }),
  },
});

module.exports = id;
