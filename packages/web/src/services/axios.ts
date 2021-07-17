import axios from "axios";

/**
 * Instância do `axios`
 */
const server = axios.create({
  baseURL: "https://bitcoin-haskell.lucasviana.dev/",
  timeout: 1000,
});

export { server };
