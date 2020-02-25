import Joi from '@hapi/joi';

const schema = Joi.object({
  _id: Joi.string().empty(''),
  _rev: Joi.string().empty(''),
  _deleted: Joi.boolean(),
  type: Joi.string().required(),
  jumpNumber: Joi.number().required(),
  diveFlow: Joi.number().required(),
  date: Joi.date().required(),
  location: Joi.string().required(),
  instructor: Joi.string().required(),
  aircraft: Joi.string().required(),
  exitAltitude: Joi.number().required(),
  deploymentAltitude: Joi.number().required(),
  recommendedNextDF: Joi.number(),
  exit: Joi.string().required(),
  freefall: Joi.string().required(),
  canopy: Joi.string().required(),
  landing: Joi.string().required()
});

export default (jump: IJump) => {
  return schema.validate(jump, { abortEarly: false });
};
