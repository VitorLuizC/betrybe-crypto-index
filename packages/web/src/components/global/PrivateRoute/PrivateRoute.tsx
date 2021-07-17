import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useToken } from "../../../context/useToken";

/**
 * Props do componente `PrivateRoute`
 */
type Props = {
  children: ReactNode;
} & RouteProps;

/**
 * Componente responsável por redirecionar o usuário para a rota deseja caso esteja autenticado,
 * caso contrário é redirecionado para o login.
 */
const PrivateRoute = ({ children, ...rest }: Props) => {
  const { token } = useToken();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
