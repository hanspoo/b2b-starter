import { LoginRequest } from '@starter-ws/auth/api';
import { dataSource, Organization, inicializarSistema } from '@starter-ws/db';
import request = require('supertest');
import { app } from '../../app';
import { IsNull, Not } from 'typeorm';

beforeAll(async () => {
  await inicializarSistema();
  // const u = dataSource
  //   .getRepository(User)
  //   .create({ email: 'info@welinux.cl', password: '123456' });

  const organization = await dataSource
    .getRepository(Organization)
    .findOne({ where: { id: Not(IsNull()) } });

  // organization.users = [u];
  await dataSource.getRepository(Organization).save(organization);
});
const credentials: LoginRequest = {
  email: 'admin@starter.com',
  password: '123456',
};

describe('login', () => {
  it('responde token en login correcto', async () => {
    const res = await request(app).post('/api/auth/login').send(credentials);
    expect(res.statusCode).toEqual(200);
    expect(res.headers['x-token']).toBeTruthy();
  });
  it('puede acceder a home page: ordenes con el token', async () => {
    const loginResult = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    const token = loginResult.headers['x-token'];

    const landingResult = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}`);
    expect(landingResult.statusCode).toEqual(200);
  });
  it('recuperar contraseña', async () => {
    const data = { email: 'admin@starter.com' };
    const response = await request(app)
      .post('/api/auth/recover-pass')
      .send(data);

    expect(response.statusCode).toEqual(200);
  });
});
