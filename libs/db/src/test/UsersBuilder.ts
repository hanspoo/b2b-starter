import { randomEmail } from '@starter-ws/shared';
import { dataSource } from '../lib/data-source';
import { Organization } from '../lib/entity/auth/organization.entity';
import { Token } from '../lib/entity/auth/token.entity';
import { User } from '../lib/entity/auth/user.entity';

export class BuilderUsers {
  organization: Organization;

  withOrganization(e: Organization) {
    this.organization = e;
  }

  async build(): Promise<
    [User, User, User, Organization, Token, Token, Token]
  > {
    const nueva = new Organization();
    nueva.name = randomEmail();

    const e = this.organization || nueva;
    const u1 = crearUser(e);
    const u2 = crearUser(e);
    const u3 = crearUser(e);
    u3.isAdmin = true;

    const organization = await dataSource.getRepository(Organization).save(e);
    const [usr1, usr2, usr3] = await dataSource
      .getRepository(User)
      .save([u1, u2, u3]);

    const t1 = await tokenParaUser(usr1);
    const t2 = await tokenParaUser(usr2);
    const t3 = await tokenParaUser(usr3);

    return [u1, u2, u3, organization, t1, t2, t3];
  }
}

function crearUser(e: Organization) {
  const u = new User();

  u.email = randomEmail();
  u.name = u.password = u.email;
  u.organization = e;

  return u;
}

async function tokenParaUser(u: User): Promise<Token> {
  const t1 = new Token();
  t1.user = u;

  return await dataSource.getRepository(Token).save(t1);
}
