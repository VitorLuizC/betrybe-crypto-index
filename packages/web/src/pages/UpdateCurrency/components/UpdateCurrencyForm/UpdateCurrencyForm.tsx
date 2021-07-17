import { Form, Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import styled from "styled-components";
import { object, string, number } from "yup";
import COLORS_PALLETE from "../../../../constants/COLORS_PALLETE";

type Props = {
  onSubmit: (values: Values) => void;
  currentCurrencies?: Record<string, number>;
};

export type Values = {
  currency?: string;
  newValue: number;
};

const initialValues: Values = {
  newValue: 0,
};

const errorMessages = {
  currency: {
    required: "A moeda é obrigatória",
  },
  newValue: {
    required: "A valor é obrigatório",
    min: "O valor deve ser maior que 0",
  },
};

const schema = object({
  currency: string().required(errorMessages.currency.required),
  newValue: number()
    .min(1, errorMessages.newValue.min)
    .required(errorMessages.newValue.required),
});

const Label = styled.label`
  color: ${COLORS_PALLETE.brighter};
`;

const UpdateCurrencyForm = ({ currentCurrencies = {}, onSubmit }: Props) => (
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
        <div className="px-3 py-2" key="currency-control">
          <Label htmlFor="currency">Moeda</Label>
          <FormControl
            as="select"
            type="currency"
            className="w-100"
            name="currency"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={dirty && Boolean(errors.currency)}
            value={values.currency}
          >
            <option value="">Selecionar opção</option>
            {Object.entries(currentCurrencies).map(([key]) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </FormControl>
          <Label className="mt-3">
            <strong>Valor atual:</strong>{" "}
            {values.currency ? (
              <span>{currentCurrencies[values.currency]}</span>
            ) : null}
          </Label>
          <FormControl.Feedback type="invalid">
            {errors.currency}
          </FormControl.Feedback>
        </div>

        <div className="px-3 py-2" key="new-value-control">
          <Label htmlFor="newValue">Novo valor</Label>
          <FormControl
            type="number"
            className="w-100"
            name="newValue"
            placeholder="Digite o valor"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={dirty && touched.newValue && Boolean(errors.newValue)}
            value={values.newValue}
          />
          <FormControl.Feedback type="invalid">
            {errors.newValue}
          </FormControl.Feedback>
        </div>

        <div className="px-3 py-2">
          <Button disabled={!dirty || !isValid} type="submit" className="w-100">
            Atualizar
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default UpdateCurrencyForm;
