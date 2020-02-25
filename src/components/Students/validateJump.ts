import Joi from '@hapi/joi';

const schema = Joi.object({
  _id: Joi.string().empty(''),
  _rev: Joi.string().empty(''),
  _deleted: Joi.boolean(),
  type: Joi.string().required(),
  jumpNumber: Joi.number().required(),
  diveFlow: Joi.number().required(),
  date: Joi.date().required(),
  location: Joi.string().empty(''),
  instructor: Joi.string().empty(''),
  aircraft: Joi.string().empty(''),
  exitAltitude: Joi.number().empty(''),
  deploymentAltitude: Joi.number(),
  exit: Joi.string().empty(''),
  freefall: Joi.string().empty(''),
  canopy: Joi.string().empty(''),
  landing: Joi.string().empty(''),
  recommendedNextDF: Joi.number().optional()
});

export default (jump: IJump) => {
  return schema.validate(jump, { abortEarly: false });
};
