import Joi from '@hapi/joi';

const schema = Joi.object({
  _id: Joi.string().empty(''),
  _rev: Joi.string().empty(''),
  _deleted: Joi.boolean(),
  type: Joi.string().required(),
  code: Joi.string()
    .required()
    .pattern(/^[A-Z-]{3,16}$/, `code: "/^[A-Z-]{3,7}$/"`),
  dzname: Joi.string().required()
});

export default (location: ILocation) =>
  schema.validate(location, { abortEarly: false });
