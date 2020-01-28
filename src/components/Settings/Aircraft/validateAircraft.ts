import Joi from '@hapi/joi';

const schema = Joi.object({
  _id: Joi.string()
    // .alphanum()
    .required(),
  _rev: Joi.string(),
  _deleted: Joi.boolean(),
  type: Joi.string().required(),
  model: Joi.string().required(),
  dook: Joi.string().required(),
  tailNumber: Joi.string().required()
});

export default (aircraft: IAircraft) =>
  schema.validate(aircraft, { abortEarly: false });
// const validateAircraft = (aircraft: IAircraft) => {
//   const result = schema.validate(aircraft, { abortEarly: false });
//   return result;
// };

// module.exports = validateAircraft;

// const validateAircraft: ValidateAircraftFunction = values => {
//   const errors: TAircraftErrors = {};
//   if (values.tailNumber && !values.tailNumber.match(/^N/)) {
//     errors.tailNumber = 'Tail number must start with N';
//   }
//   return errors;
// };

// export default validateAircraft;
