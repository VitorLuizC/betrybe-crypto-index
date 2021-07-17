import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PublicLayout from "../../components/global/PublicLayout/PublicLayout";
import FormControl from "react-bootstrap/FormControl";
import COLORS_PALLETE from "../../constants/COLORS_PALLETE";
import { ChangeEvent } from "react";
import CalculatorIllustration from "../../components/illustrations/CalculatorIllustration";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { server } from "../../services/axios";

const Container = styled.div`
  display: flex;
  place-content: center;
  height: 100%;
  flex-wrap: wrap;
`;

const Label = styled.label`
  color: ${COLORS_PALLETE.brighter};
`;

const FormControlWrapper = styled.div``;

const DisplayValue = styled.div`
  padding: 10px;
  background-color: ${COLORS_PALLETE.brighter};
  overflow-x: auto;
`;

type Currency = {
  rate_float: number;
  rate: string;
  code: string;
  description: string;
};

type Time = {
  updatedISO: string;
  updated: string;
  updateduk: string;
};

type CurrenciesListResponse = {
  time: Time;
  disclaimer: string;
  bpi: Record<string, Currency>;
};

const Currencies = () => {
  const [value, setValue] = useState(0);

  const [currencies, setCurrencies] = useState<[string, Currency][] | null>(
    null
  );

  useEffect(() => {
    server
      .get<CurrenciesListResponse>("/api/crypto/btc")
      .then(({ data: { bpi } }) => {
        const currencies = Object.entries(bpi).filter(([key]) => key !== "BTC");

        setCurrencies(currencies);
      });
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newvalue = Number(event.target.value);

      if (Number.isNaN(newvalue)) return;

      if (newvalue > 0) setValue(newvalue);
    },
    [setValue]
  );

  return (
    <PublicLayout>
      <Container>
        <div className="row w-100 mb-5">
          <Link to="/update-currency" className="mx-auto">
            <Button variant="success">Atualizar valor monetário</Button>
          </Link>
        </div>
        <div className="row w-100 mb-3">
          <FormControlWrapper className="col-6 mx-auto">
            <Label htmlFor="btc">BTC</Label>
            <FormControl
              type="number"
              id="btc"
              value={value}
              onChange={handleChange}
              min="0"
              className="text-center"
            />
          </FormControlWrapper>
        </div>

        {currencies !== null ? (
          <div className="row w-100 justify-content-center">
            {currencies.map(([key, currency]) => (
              <div key={key} className="col-3 text-center">
                <FormControlWrapper className="w-100">
                  <Label htmlFor={key}>{key}</Label>
                  <DisplayValue>
                    {parseFloat(`${value * currency.rate_float}`).toFixed(2)}
                  </DisplayValue>
                </FormControlWrapper>
              </div>
            ))}
          </div>
        ) : null}

        <div className="row w-100 text-center">
          <CalculatorIllustration
            className="mx-auto mt-4"
            width="500px"
            height="100%"
            fill={COLORS_PALLETE.primary}
          />
        </div>
      </Container>
    </PublicLayout>
  );
};

export default Currencies;
