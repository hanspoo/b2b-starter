import { User } from './entity/auth/user.entity';

export class Validacion {
  // Verdadero si u1 puede modificar a u2
  static puedeModificar(u1: User, u2: User): string {
    if (!u1) throw Error('Debe entregar el user conectado, u1');
    if (!u2) throw Error('Debe entregar el user a modificar');

    const mismaOrganization = u1.organization.id === u2.organization.id;
    const mismoUser = u1.id === u2.id;

    if (mismaOrganization && mismoUser) return '';
    if (mismaOrganization && u1.isAdmin) return '';

    return `${u1.id} no está autorizado param modificar a ${u2.id}`;
  }
}
