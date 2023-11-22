declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NX_SMTP_SERVER: string;
      NODE_ENV: 'development' | 'production' | 'test';
      NX_SMTP_PASS: string;
      NX_SMTP_PORT: string;
      NX_SMTP_USER: string;
      USAR_COD_CENCO: string;
      VIGENCIA_PERMISOS: number;
      SMTP_PASS: string;
      SMTP_PORT: string;
      SMTP_SERVER: string;
      SMTP_USER: string;
    }
  }
}

declare module 'nodemailer' {
  export const createTransport: any;
}
