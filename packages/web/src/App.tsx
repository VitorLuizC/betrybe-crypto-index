import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import COLORS_PALLETE from "./constants/COLORS_PALLETE";
import LoginComponent from "./pages/Login/Login";
import CurrenciesComponent from "./pages/Currencies/Currencies";
import UpdateCurrencyComponent from "./pages/UpdateCurrency/UpdateCurrency";

import pipe from "@bitty/pipe";
import TokenProvider from "./context/useToken";
import withProvider from "./utils/react/withProvider";
import PrivateRoute from "./components/global/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import Footer from "./components/global/Footer/Footer";
import Header from "./components/global/Header/Header";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    overflow: auto;
  }

  body {
    margin: 0;
    background-color: ${COLORS_PALLETE.background};
    font-family: 'Montserrat', sans-serif;
  }
`;

const App = () => (
  <Router>
    <GlobalStyle />
    <Header />
    <Switch>
      <Route path="/" exact>
        <Home homeRoute="/currencies" />
      </Route>
      <PrivateRoute path="/update-currency">
        <UpdateCurrencyComponent />
      </PrivateRoute>
      <PrivateRoute path="/currencies">
        <CurrenciesComponent />
      </PrivateRoute>
      <Route path="/login">
        <LoginComponent />
      </Route>
    </Switch>
    <Footer />
  </Router>
);

const enhance = pipe(withProvider(TokenProvider));

export default enhance(App);
