import { cleanupEmail } from '@starter-ws/mail-utils';
import { PassService } from './PassService';
import { dataSource } from '../data-source';
import { PermisoUsarEmail } from '../entity/auth/grant-use-email.entity';
import { User } from '../entity/auth/user.entity';
import { logger } from '../utils/logger';

export const repoUsr = dataSource.getRepository(User);
export const repoPermisos = dataSource.getRepository(PermisoUsarEmail);

export type ExecuteChangePassResponse = {
  success: boolean;
  msg: string;
};

export class ExecuteChangePassService {
  async execute(
    email: string,
    token: string,
    password: string
  ): Promise<ExecuteChangePassResponse> {
    if (!(token && email && password))
      return { success: false, msg: 'Faltan datos' };

    if (!email) return { success: false, msg: 'Debe venir el email' };
    email = cleanupEmail(email);

    const user = await repoUsr.findOne({ where: { email } });
    if (!user) return { success: false, msg: 'User no existe' };

    const permiso = await repoPermisos.findOne({
      where: { token, email, vigente: true },
    });
    if (permiso) {
      logger.debug(`Cambiando contraseña de ${user.email}`);
      user.password = await new PassService().hash(password);
      await repoUsr.save(user);
      permiso.vigente = false;
      permiso.fechaUso = new Date().getTime();
      await repoPermisos.save(permiso);
      return { success: true, msg: 'Ok' };
    } else return { success: false, msg: 'No hay permiso para la operación' };
  }
}
