import * as nodemailer from 'nodemailer';
import { randomInt } from 'node:crypto';
import { dataSource } from '../data-source';
import { SolicitudRegistro } from '../entity/auth/registration-request.entity';
import { genCodSeguridad } from '@starter-ws/shared';
import { mailer } from '@starter-ws/mail-utils';

export type SignupArgs = {
  identLegal: string;
  organization: string;
  name: string;
  email: string;
  password: string;
};

export class SignupService {
  codigoSeguridad: number;
  organization: string;
  name: string;
  email: string;
  password: string;
  identLegal: string;

  async execute(): Promise<SolicitudRegistro> {
    const repo = dataSource.getRepository(SolicitudRegistro);

    this.codigoSeguridad = genCodSeguridad();
    const sol = await repo.save(
      repo.create({
        identLegal: this.identLegal,
        organization: this.organization,
        name: this.name,
        email: this.email,
        password: this.password,
        cseg: this.codigoSeguridad,
      })
    );

    this.enviarEmail();

    return sol;
  }
  enviarEmail() {
    const transporter = mailer();
    transporter.verify().then(console.log).catch(console.error);

    const response = transporter.sendMail({
      from: '"Hans Poo" <hanscpoo@welinux.cl>', // sender address
      to: this.email,
      subject: 'Registro en starter',
      text: `
        Hola,

        Para activar su nueva cuenta starter, copie y pegue este código de confirmación de seis dígitos en la pantalla de su navegador.
        
        ${this.codigoSeguridad}
        
        Si no encuentra dónde introducir el código, vuelva a introducir su correo electrónico aquí..

        El equipo de starter
        ¿Necesita ayuda? Póngase en contacto con nosotros.        
        `,
      html: `
        <p>Hola,</p>

        <p> Para activar su nueva cuenta starter, copie y pegue este c&oacute;digo de confirmaci&oacute;n de seis d&iacute;gitos en la pantalla de su navegador.</p>
         
         <h1>${this.codigoSeguridad}</h1>
         
         <p>Si no encuentra d&oacute;nde introducir el c&oacute;digo,&#160;vuelva a introducir su correo electr&oacute;nico aqu&iacute;..</p>
        
        <p> El equipo de starter<br>
         &iquest;Necesita ayuda?&#160;P&oacute;ngase en contacto con nosotros.</p>        
        `,
    });

    return response;
  }

  async validate(): Promise<[boolean, Array<string>]> {
    const errors: Array<string> = [];
    if (!/\w+/.test(this.organization)) errors.push('Organization inválida');
    if (!/\w+/.test(this.identLegal)) errors.push('Ident legal inválido');
    if (!/\w+/.test(this.name)) errors.push('Nombre inválido');
    if (!/\w+/.test(this.email)) errors.push('Email inválido');
    if (!/\w+/.test(this.password)) errors.push('Contraseña inválida');
    if (errors.length > 0) return [false, errors];

    return [true, []];
  }
  constructor(params: SignupArgs) {
    this.organization = params.organization;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.identLegal = params.identLegal;
  }
}
