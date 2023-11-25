import * as crypto from 'node:crypto';
import { DataSource } from 'typeorm';
import { Archivo } from './entity/file.entity';
import { Organization } from './entity/auth/organization.entity';
import { Token } from './entity/auth/token.entity';
import { User } from './entity/auth/user.entity';

import { SolicitudRegistro } from './entity/auth/registration-request.entity';
import { SolicitudAutenticarEmail } from './entity/auth/email-authentication-request.entity';
import { PermisoUsarEmail } from './entity/auth/grant-use-email.entity';
const LOGGING = !!process.env['DEBUG_DB'] || false;
const testEnv = 'test';

const dbArgs: any = {
  type: process.env['NODE_ENV'] === testEnv ? 'sqlite' : 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  username: process.env['DB_USER'] || 'starter',
  password: process.env['DB_PASS'] || 'starter',

  database:
    process.env['NODE_ENV'] === testEnv
      ? '/tmp/db/' + crypto.randomBytes(12).toString('hex')
      : process.env['DB_NAME'] || 'starter',
};

const dataSource = new DataSource({
  ...dbArgs,
  entities: [
    Archivo,
    Organization,
    User,
    Token,
    SolicitudRegistro,
    SolicitudAutenticarEmail,
    PermisoUsarEmail,
  ],
  logging: LOGGING,
  synchronize: true,

  extra: { max: 10, connectionTimeoutMillis: 3000 },
});

export { dataSource };
