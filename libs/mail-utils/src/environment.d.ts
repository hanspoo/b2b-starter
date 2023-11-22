declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_SERVER: string;
      NODE_ENV: "development" | "production" | "test";
      SMTP_PASS: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      USAR_COD_CENCO: string;
    }
  }
}

export {};
