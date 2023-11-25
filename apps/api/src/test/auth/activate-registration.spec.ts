import { ActivationRequest, ActivationResponse } from '@starter-ws/auth/api';
import { inicializarSistema } from '@starter-ws/db';
import request from 'supertest';
import { app } from '../../app';

beforeAll(inicializarSistema);

const bodyReq: ActivationRequest = {
  cseg: 123456,
  email: 'info@starter.com',
};
describe('servicio activacion registro users', () => {
  it('existe el endpoint', async () => {
    const res = await request(app).post('/api/auth/activate').send(bodyReq);
    expect(res.statusCode).toEqual(200);
    const bodyRes: ActivationResponse = res.body;
    expect(bodyRes.msg).toContain('REG001');
  });
});
