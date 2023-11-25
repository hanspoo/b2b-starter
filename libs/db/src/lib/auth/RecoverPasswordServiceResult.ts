import { SolicitudAutenticarEmail } from '../entity/auth/email-authentication-request.entity';

export type RecoverPasswordServiceResult = {
  success: boolean;
  msg: string;
  solicitud?: SolicitudAutenticarEmail;
};
