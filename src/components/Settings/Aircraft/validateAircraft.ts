import Joi from '@hapi/joi';

const schema = Joi.object({
  _id: Joi.string().empty(''),
  _rev: Joi.string().empty(''),
  _deleted: Joi.boolean(),
  type: Joi.string().required(),
  tailNumber: Joi.string()
    .required()
    .pattern(
      /^N[1-9]{1,4}[A-Z]{1,2}$/,
      `'tail number: "/^N[1-9]{1,4}[A-Z]{1,2}$/"`
    ),
  model: Joi.string().required(),
  currentLocation: Joi.string().empty('')
});

export default (aircraft: IAircraft) =>
  schema.validate(aircraft, { abortEarly: false });
