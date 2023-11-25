import { PassService } from './auth/PassService';
import { dataSource } from './data-source';
import { Organization } from './entity/auth/organization.entity';
import { User } from './entity/auth/user.entity';

export async function inicializarSistema(): Promise<Organization> {
  if (!dataSource.isInitialized) await dataSource.initialize();
  if (process.env['NODE_ENV']?.startsWith('test')) {
    await dataSource.synchronize(true);
  }
  const repoOrganization = dataSource.getRepository(Organization);
  const e = await repoOrganization.findOne({ where: { name: 'starter' } });
  if (e) {
    console.log(`Inicialización cancelada, organization starter ya existe`);
    return e;
  }

  const organization = await crearOrganization();

  return repoOrganization.save(organization);
}

export async function crearOrganization(): Promise<Organization> {
  const repoOrganization = dataSource.getRepository(Organization);
  const e = repoOrganization.create({
    name: 'starter',
    identLegal: '76531540-9',
  });

  const user = dataSource.getRepository(User).create({
    email: 'admin@starter.com',
    password: await new PassService().hash('123456'),
    name: 'Admin',
    isAdmin: true,
  });

  e.users = [user];

  return e;
}
