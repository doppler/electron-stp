import Joi from '@hapi/joi';

const schema = Joi.object({
  _id: Joi.string().empty(''),
  _rev: Joi.string().empty(''),
  _deleted: Joi.boolean(),
  type: Joi.string().required(),
  name: Joi.string()
    .min(3)
    .pattern(/^[A-Z].*\s[A-Za-z].*$/)
    .rule({ message: 'Properly capitalized full name required' })
    .required(),
  email: Joi.string()
    .pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)
    .rule({ message: "Phone must match pattern 'NNN NNN NNNN'" })
    .required(),
  currentLocation: Joi.string().empty(''),
  hometown: Joi.string().empty(''),
  locations: Joi.array().empty(),
  previousJumpNumber: Joi.number().required()
});

export default (student: IStudent) => {
  return schema.validate(student, { abortEarly: false });
};
