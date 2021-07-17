import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import PublicLayout from "../../components/global/PublicLayout/PublicLayout";

import Button from "react-bootstrap/Button";
import UpdateCurrencyForm, {
  Values as UpdateCurrencyFormValues,
} from "./components/UpdateCurrencyForm/UpdateCurrencyForm";
import { server } from "../../services/axios";
import { useToken } from "../../context/useToken";

const Container = styled.div`
  display: flex;
  place-content: center;
  height: 100%;
  flex-wrap: wrap;
`;

const UpdateCurrency = () => {
  const [currenciesList, setCurrenciesList] = useState<Record<
    string,
    number
  > | null>(null);

  const { token } = useToken();

  const isLoggedIn = useMemo(() => typeof token === "string", [token]);

  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn)
      server
        .get<Record<string, number>>("/static/currencies.json")
        .then(({ data: currencies }) => {
          setCurrenciesList(currencies);
        });
  }, [history, isLoggedIn]);

  const handleUpdateCurrencySubmit = async (
    values: UpdateCurrencyFormValues
  ) => {
    await server.post<{ message: string }>("/api/crypto/btc", {
      currencyCode: values.currency,
      currencyValue: values.newValue,
    });

    history.push("/currencies");
  };

  return (
    <PublicLayout>
      <Container>
        <div className="row w-100 mb-5">
          <Link to="/currencies">
            <Button>Voltar</Button>
          </Link>
        </div>
        {currenciesList !== null ? (
          <div className="row w-100">
            <UpdateCurrencyForm
              currentCurrencies={currenciesList}
              onSubmit={handleUpdateCurrencySubmit}
            />
          </div>
        ) : null}
      </Container>
    </PublicLayout>
  );
};

export default UpdateCurrency;
