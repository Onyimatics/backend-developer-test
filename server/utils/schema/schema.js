import Joi from 'joi';

const firstName = Joi.string()
  .lowercase()
  .required();

const lastName = Joi.string()
  .lowercase()
  .required();

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(8)
  .required()
  .strict();

const loginPassword = Joi.string()
  .required()
  .strict();

const signupSchema = {
  body: {
    firstName,
    lastName,
    email,
    password,
  },
};

const loginSchema = {
  body: {
    email,
    password: loginPassword,
  },
};

export default [
  {
    route: '/signup',
    method: 'post',
    schema: signupSchema,
  },
  {
    route: '/signin',
    method: 'post',
    schema: loginSchema,
  },
];
