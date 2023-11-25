/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { randomEmail } from '@starter-ws/shared';
import { randomUUID } from 'crypto';
import { crearPermisoFake, fakeToken } from './auth-test-utils';
import { dataSource } from '../../lib/data-source';
import { PermisoUsarEmail } from '../../lib/entity/auth/grant-use-email.entity';
import { User } from '../../lib/entity/auth/user.entity';
import { inicializarSistema } from '../../lib/initSystem';
import { ExecuteChangePassService } from '../../lib/auth/ExecuteChangePassService';

export const repoUsr = dataSource.getRepository(User);
export const repo = dataSource.getRepository(PermisoUsarEmail);

beforeAll(async () => {
  await inicializarSistema();
});

describe('actualiza la pass', () => {
  it('datos inválidos', async () => {
    const token = '';
    const email = '';
    const password = '';
    const service = new ExecuteChangePassService();
    const response = await service.execute(token, email, password);
    expect(response.success).toBe(false);
  });
  it('con user inexistente da error', async () => {
    const password = '123';
    const token = fakeToken();

    const service = new ExecuteChangePassService();
    const response = await service.execute(token, randomEmail(), password);
    expect(response.success).toBe(false);
    expect(response.msg).toContain('User');
  });
  it('si no hay permiso da false', async () => {
    const password = '123';
    const token = fakeToken();

    const service = new ExecuteChangePassService();
    const response = await service.execute(
      token,
      'admin@starter.com',
      password
    );
    expect(response.success).toBe(false);
  });

  it('el user debe tener cambiada la contraseña', async () => {
    const email = 'admin@starter.com';
    const password = randomUUID();
    const antes = await repoUsr.findOne({
      where: { email },
    });
    const [, token] = await crearPermisoFake(email);

    const service = new ExecuteChangePassService();
    await service.execute(email, token, password);
    const despues = await repoUsr.findOne({
      where: { email },
    });

    expect(antes!.password).not.toBe(despues!.password);
  });
  it('no importa el case o espacios del email', async () => {
    const email = 'admin@starter.com';
    const password = randomUUID();
    const antes = await repoUsr.findOne({
      where: { email },
    });
    const [, token] = await crearPermisoFake(email);

    const service = new ExecuteChangePassService();
    await service.execute('  ADMIN@starter.com', token, password);
    const despues = await repoUsr.findOne({
      where: { email },
    });

    expect(antes!.password).not.toBe(despues!.password);
  });
  it('el permiso una vez usado queda inválido', async () => {
    const email = 'admin@starter.com';
    const password = randomUUID();
    const [, token] = await crearPermisoFake(email);

    const service = new ExecuteChangePassService();
    const r1 = await service.execute(email, token, password);
    expect(r1.success).toBe(true);

    const r2 = await service.execute(email, token, password);
    expect(r2.success).toBe(false);
  });
  it('sin permiso rechaza la modificación', async () => {
    const email = 'admin@starter.com';
    const password = randomUUID();

    const service = new ExecuteChangePassService();
    const response = await service.execute(email, fakeToken(), password);

    expect(response.success).toBe(false);
  });
});
