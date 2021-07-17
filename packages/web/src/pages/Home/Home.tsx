import React from "react";
import { Redirect } from "react-router-dom";
import { useToken } from "../../context/useToken";

/**
 * Props do componente `Home`
 */
type Props = {
  homeRoute: string;
};

/**
 * Componente que redireciona o usuário para sua devida rota, dependendo se
 * está autenticado ou não.
 */
const Home = ({ homeRoute }: Props) => {
  const { token } = useToken();

  return token === null ? (
    <Redirect to="/login" />
  ) : (
    <Redirect to={homeRoute} />
  );
};

export default Home;
