import { dataSource } from '../data-source';
import {
  cleanupEmail,
  isValidEmail,
  Mailer,
  NodeMailer,
} from '@starter-ws/mail-utils';

import { User } from '../entity/auth/user.entity';
import { SolicitudAutenticarEmail } from '../entity/auth/email-authentication-request.entity';

import { RecoverPasswordServiceResult } from './RecoverPasswordServiceResult';
import { errMessage, genCodSeguridad } from '@starter-ws/shared';

export class RecoverPasswordService {
  codigoSeguridad: any;
  mailer: Mailer;
  constructor(public email: string) {
    this.mailer = new NodeMailer();
  }

  async execute(): Promise<RecoverPasswordServiceResult> {
    const repoUsr = dataSource.getRepository(User);
    const repoSol = dataSource.getRepository(SolicitudAutenticarEmail);

    const email = cleanupEmail(this.email);
    if (!isValidEmail(this.email)) {
      return { success: false, msg: `RPA001: Email ${email} es inválido` };
    }
    const user = await repoUsr.findOne({
      where: { email: this.email.toLowerCase().trim() },
    });
    if (!user)
      return {
        success: false,
        msg: `RPA002: ${errMessage('RPA002')}`,
      };

    const cseg = genCodSeguridad();
    const obj = repoSol.create({ email, cseg });
    const solicitud = await repoSol.save(obj);

    this.mailer.send({
      from: '"Hans Poo" <hanscpoo@welinux.cl>', // sender address
      to: this.email,
      subject: 'Recuperación de contraseña en starter',
      text: `
        Hola,

        Para crear una nueva contraseña en starter, ingrese este código de confirmación en la pantalla de su navegador.
        
        ${cseg}
                
        El equipo de starter
        ¿Necesita ayuda? Póngase en contacto con nosotros.        
        `,
      html: `
        <p>Hola,</p>

        <p> Para crear una nueva contraseña en starter, ingrese este c&oacute;digo de confirmaci&oacute;n en la pantalla de su navegador.</p>
         
         <h1>${cseg}</h1>
                 
        <p> El equipo de starter<br>
         &iquest;Necesita ayuda?&#160;P&oacute;ngase en contacto con nosotros.</p>        
        `,
    });

    return { success: true, msg: errMessage('RPA001'), solicitud };
  }
}
