import Joi from '@hapi/joi';

const schema = Joi.object({
  _id: Joi.string().empty(''),
  _rev: Joi.string().empty(''),
  _deleted: Joi.boolean(),
  type: Joi.string().required(),
  uspaNumber: Joi.number()
    .min(1000)
    .required(),
  name: Joi.string()
    .min(3)
    .pattern(/^[A-Z]/)
    .rule({ message: 'Please Capitalize Name' })
    .required(),
  email: Joi.string()
    .pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)
    .rule({ message: "Phone must match pattern 'NNN NNN NNNN'" })
    .required(),
  currentLocation: Joi.string().empty(''),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
    .rule({ message: 'Password must contain upper and lowercase and digits' }),
  passwordConfirm: Joi.string()
    .when('password', {
      is: Joi.exist(),
      then: Joi.equal('password').required(),
      otherwise: Joi.string().empty('')
    })
    .equal(Joi.ref('password'))
    .strip()
});

export default (instructor: IInstructor) => {
  return schema.validate(instructor, { abortEarly: false });
};
