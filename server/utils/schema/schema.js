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

const teamName = Joi.string()
  .required();

const teamMembers = Joi.number()
  .required();

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

const teamParamSchema = {
  params: {
    teamId: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .error(new Error('Invalid team Id')),
  },
};

const createTeamSchema = {
  body: {
    teamName,
    teamMembers,
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
  {
    route: '/',
    method: 'post',
    schema: createTeamSchema,
  },
  {
    route: '/:teamId',
    method: 'patch',
    schema: teamParamSchema,
  },
  {
    route: '/:teamId',
    method: 'get',
    schema: teamParamSchema,
  },
  {
    route: '/:teamId',
    method: 'delete',
    schema: teamParamSchema,
  },
];
