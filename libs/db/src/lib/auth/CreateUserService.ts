import { dataSource } from '../data-source';
import { Organization } from '../entity/auth/organization.entity';
import { SolicitudRegistro } from '../entity/auth/registration-request.entity';
import { User } from '../entity/auth/user.entity';
import { PassService } from './PassService';

export class CrearUserService {
  organization: string;
  name: string;
  email: string;
  password: string;
  identLegal: string;

  async crearDesdeSolicitud(s: SolicitudRegistro): Promise<Organization> {
    this.organization = s.organization;
    this.name = s.name;
    this.email = s.email;
    this.password = s.password;
    this.identLegal = s.identLegal;

    return this.execute();
  }
  async execute(): Promise<Organization> {
    const repoOrganization = dataSource.getRepository(Organization);

    const e = await repoOrganization.save(
      repoOrganization.create({
        identLegal: this.identLegal,
        name: this.organization,
      })
    );

    const user = dataSource.getRepository(User).create({
      name: this.name,
      email: this.email,
      password: await new PassService().hash(this.password),
      isAdmin: true,
    });

    e.users = [user];

    return await repoOrganization.save(e);
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
}
