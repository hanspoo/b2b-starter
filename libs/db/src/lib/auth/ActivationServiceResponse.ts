import { SolicitudRegistro } from '../entity/auth/registration-request.entity';

export type ActivationServiceResponse = {
  success?: boolean;
  msg: string;
  solicitud?: SolicitudRegistro;
};
