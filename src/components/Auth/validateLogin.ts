import Joi from '@hapi/joi';

const schema = Joi.object({
  email: Joi.string().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
    .rule({ message: 'Password must contain upper and lowercase and digits' })
});

export default (login: TLoginFormValues) =>
  schema.validate(login, { abortEarly: false });
