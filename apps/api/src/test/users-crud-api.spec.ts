import {
  BuilderUsers,
  User,
  dataSource,
  inicializarSistema,
} from '@starter-ws/db';
import request from 'supertest';
import { logear } from './utils';
import { app } from '../app';
import { randomEmail } from '@starter-ws/shared';

beforeAll(async () => {
  await inicializarSistema();
});

let user: User;
beforeEach(() => {
  user = new User();
  user.name = 'Pato donald';
  user.email = randomEmail();
  user.password = '123456';
});

describe('crud de users', () => {
  it('user válido y logeado responde con 200', async () => {
    const token = await logear();
    const response = await request(app)
      .post('/api/users')
      .send(user)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    const u = response.body as User;
    expect(u.name).toEqual('Pato donald');
    expect(u.id).toBeTruthy();
    expect(u.organization).toBeTruthy();
  });
});

/**
 * Modificar un user
 *
 * - Seguridad ¿ quien puede modificarlo ?
 *
 * 1.- un administrador de su misma organization
 * 2.- el mismo
 *
 * pruebas:
 * 1.- Un user sin logear, debe dar error de autorización
 *
 * como es modificación
 * tenemos el user admin principal
 *
 * 2.- Un user logeado de otra organization, debe dar error de autorización
 * 3.- Un user logeado de misma organization pero no admin, debe dar error de autorización
 * 4.- El mismo user logeado, debe dar 200
 * 5.- Un admin de la misma organization, debe dar 200
 *
 * 6.- Si pasa organization, la debe dejar igual
 * 7.- Si pasa flag de admin y no es admin, la debe dejar igual
 *
 *
 *
 * - Que datos puede cambiar
 *
 * - Sólo: name, contraseña y email
 *
 */

describe('Modificar un user', () => {
  it('Un user sin logear, debe dar error de autorización', async () => {
    const response = await request(app).put('/api/users').send(user);
    expect(response.status).toBe(401);
  });
  it('Un user logeado de otra organization, debe dar error de autorización', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsers().build();
    const response = await request(app)
      .put('/api/users/' + user.id)
      .set('Authorization', `Basic ${token.id}`)
      .send(user);
    expect(response.status).toBe(401);
  });
  it('Un user logeado de misma organization pero no admin, debe dar error de autorización', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsers().build();
    const response = await request(app)
      .put('/api/users/' + u2.id)
      .set('Authorization', `Basic ${t1.id}`)
      .send(user);
    expect(response.status).toBe(401);
  });
  it('El mismo user logeado, debe dar 200', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsers().build();
    const response = await request(app)
      .put('/api/users/' + u1.id)
      .set('Authorization', `Basic ${t1.id}`)
      .send(user);

    console.log(response.text);
    expect(response.status).toBe(200);
  });
  it('Se modifica el name de acuerdo a entregado', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsers().build();
    const response = await request(app)
      .put('/api/users/' + u1.id)
      .set('Authorization', `Basic ${t1.id}`)
      .send({ ...user, name: 'Luke', email: 'start@wars.com' });

    const repo = dataSource.getRepository(User);
    const modificado = await repo.findOne({
      where: { id: u1.id },
    });

    expect(modificado.name).toBe('Luke');
    expect(modificado.email).toBe('start@wars.com');
  });
});
