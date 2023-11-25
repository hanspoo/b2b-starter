import { SignupService } from '../../lib/auth/SignupService';
import { inicializarSistema } from '../../lib/initSystem';
import { randomBytes } from 'crypto';

let organization = 'Alfa Centauro';
let name = 'Arnold';
let email = 'hanspoo@gmail.com';
let password = '123456';
let identLegal = '123456';

beforeEach(() => {
  const rnd = randomBytes(6).toString('hex');
  organization = 'Alfa Centauro' + rnd;
  name = 'Arnold' + rnd;
  email = 'hanspoo@gmail.com';
  password = '123456';
  identLegal = identLegal + rnd;
});

beforeAll(async () => {
  await inicializarSistema();
});
describe('registra cliente', () => {
  describe('validaciones', () => {
    it('todos los datos validación ok', async () => {
      const service = new SignupService({
        organization,
        name,
        email,
        password,
        identLegal,
      });
      const [isOk, msg] = await service.validate();
      expect(isOk).toBe(true);
    });
    it('si falta el name error', async () => {
      const service = new SignupService({
        name: '',
        organization,
        email,
        password,
        identLegal,
      });
      const [isOk, msg] = await service.validate();
      expect(isOk).toBe(false);
    });
    it('si falta el organization error', async () => {
      const service = new SignupService({
        name,
        organization: '',
        email,
        password,
        identLegal,
      });
      const [isOk, msg] = await service.validate();
      expect(isOk).toBe(false);
    });
    it('si falta el email error', async () => {
      const service = new SignupService({
        name,
        organization,
        email: '',
        password,
        identLegal,
      });
      const [isOk, msg] = await service.validate();
      expect(isOk).toBe(false);
    });
    it('si falta la contraseña error', async () => {
      const service = new SignupService({
        name,
        organization,
        email,
        password: '',
        identLegal,
      });
      const [isOk, msg] = await service.validate();
      expect(isOk).toBe(false);
    });
    it.skip('asigna codigo aleatorio numerico largo 6', async () => {
      const service = new SignupService({
        name,
        organization,
        email,
        password: '',
        identLegal,
      });
      const [isOk, msg] = await service.validate();
      const sr = service.execute();
      expect((await sr).cseg).toBeGreaterThan(100000);
    });
  });
});
