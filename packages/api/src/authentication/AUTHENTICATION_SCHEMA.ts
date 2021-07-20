import * as Yup from 'yup';

const AUTHENTICATION_SCHEMA = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().length(6).required(),
});

export default AUTHENTICATION_SCHEMA;
