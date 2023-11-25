import { dataSource } from '../lib/data-source';
import { inicializarSistema } from '../lib/initSystem';

beforeEach(async () => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  await dataSource.query('delete from user');
  await dataSource.query('delete from organization');
});
describe('inicializar sistema', () => {
  it('debe crear organization', async () => {
    const e = await inicializarSistema();
    expect(e).toBeTruthy();
  });
  it('organization tiene users', async () => {
    const e = await inicializarSistema();
    expect(e.users.length).toBeGreaterThan(0);
  });
});
