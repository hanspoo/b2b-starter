declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      SMTP_PASS: string;
      SMTP_PORT: string;
      SMTP_SERVER: string;
      SMTP_USER: string;
      UPLOAD_FOLDER: string;
      VIGENCIA_PERMISOS: string;
      VITE_SERVER_URL: string;
    }
  }
}

declare module 'nodemailer' {
  export const createTransport: any;
}

export {};

