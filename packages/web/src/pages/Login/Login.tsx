import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import PublicLayout from "../../components/global/PublicLayout/PublicLayout";
import DigitialCurrencyIllustration from "../../components/illustrations/DigitalCurrencyIllustration";
import COLORS_PALLETE from "../../constants/COLORS_PALLETE";
import { useToken } from "../../context/useToken";
import { server } from "../../services/axios";
import LoginForm, {
  Values as LoginFormValues,
} from "./components/LoginForm/LoginForm";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const IllustrationWrapper = styled.div`
  display: none;
  padding: 15px 25px;

  @media (min-width: 768px) {
    display: block;
    width: 60%;
  }
`;

const FormLoginWrapper = styled.section`
  padding: 15px 25px;
  margin: 10px;
  background-color: ${COLORS_PALLETE.brighter ?? ""};
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  width: 100%;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.3rem;
  color: red;
`;

type LoginResponse = {
  token: string;
};

const Login = () => {
  const { token, setToken } = useToken();

  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleLoginFormSubmit = useCallback(
    async ({ email, password }: LoginFormValues) => {
      setErrorMessage(null);

      try {
        const {
          data: { token: receivedToken },
        } = await server.post<LoginResponse>(
          "/api/login",
          { email, password },
          {}
        );

        setToken(receivedToken);
      } catch (error) {
        if (error.response) {
          const { message } = error.response.data;

          setErrorMessage(message ?? null);
        }
      }
    },
    [setToken]
  );

  return token === null ? (
    <PublicLayout>
      <Container>
        <IllustrationWrapper>
          <DigitialCurrencyIllustration
            width="100%"
            height="100%"
            fill={COLORS_PALLETE.primary}
          />
        </IllustrationWrapper>
        <FormLoginWrapper>
          <LoginForm onSubmit={handleLoginFormSubmit} />
          {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        </FormLoginWrapper>
      </Container>
    </PublicLayout>
  ) : (
    <Redirect to="/currencies" />
  );
};

export default Login;
