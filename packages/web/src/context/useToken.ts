import constate from "constate";
import { useCallback, useEffect, useState } from "react";

import { server } from "../services/axios";

/**
 * Hook e Context Provider responsáveis por prover o token
 * recebido no login
 */
const [TokenProvider, useToken] = constate(() => {
  const [token, setToken] = useState<undefined | null | string>();

  const revokeToken = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, [setToken]);

  useEffect(() => {
    const value = localStorage.getItem("token");

    setToken(value);
  }, []);

  useEffect(() => {
    const current_token = localStorage.getItem("token");

    if (!token && current_token !== token) {
      setToken(current_token);
    }

    if (token && current_token !== token) {
      localStorage.setItem("token", token);
    }

    server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  return { token, setToken, revokeToken };
});

export { useToken };

export default TokenProvider;
