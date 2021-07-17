import { Form, Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import styled from "styled-components";
import { object, string } from "yup";
import COLORS_PALLETE from "../../../../constants/COLORS_PALLETE";

type Props = {
  onSubmit: (values: Values) => void;
};

export type Values = {
  email: string;
  password: string;
};

const initialValues: Values = {
  email: "",
  password: "",
};

const errorMessages = {
  email: {
    email_format: "Email inválido",
    required: "O email é obrigatório",
  },
  password: {
    length: "A senha deve conter 6 carateres",
    required: "A senha é obrigatória",
  },
};

const schema = object({
  email: string()
    .email(errorMessages.email.email_format)
    .required(errorMessages.email.required),
  password: string()
    .length(6, errorMessages.password.length)
    .required(errorMessages.password.required),
});

const Title = styled.h1`
  font-size: 2rem;
  color: ${COLORS_PALLETE.secondary};
  text-align: center;
  margin-bottom: 20px;
`;

const LoginForm = ({ onSubmit }: Props) => (
  <Formik<Values>
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={schema}
  >
    {({
      handleChange,
      handleBlur,
      handleSubmit,
      dirty,
      errors,
      values,
      touched,
      isValid,
    }) => (
      <Form className="w-100" onSubmit={handleSubmit}>
        <Title>Entre para continuar</Title>

        <div className="px-3 py-2" key="email-control">
          <FormControl
            type="email"
            className="w-100"
            name="email"
            placeholder="Digite seu email"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={dirty && touched.email && Boolean(errors.email)}
            value={values.email}
          />
          <FormControl.Feedback type="invalid">
            {errors.email}
          </FormControl.Feedback>
        </div>

        <div className="px-3 py-2" key="password-control">
          <FormControl
            className="w-100"
            name="password"
            placeholder="Digite sua senha"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={dirty && touched.password && Boolean(errors.password)}
            value={values.password}
          />
          <FormControl.Feedback type="invalid">
            {errors.password}
          </FormControl.Feedback>
        </div>

        <div className="px-3 py-2">
          <Button disabled={!dirty || !isValid} type="submit" className="w-100">
            Entrar
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
