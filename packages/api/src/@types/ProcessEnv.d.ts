declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;
    PORT?: string;
    HOSTNAME?: string;
  }
}
