import { dataSource } from '../data-source';
import { User } from '../entity/auth/user.entity';
import { PassService } from './PassService';

export class CredentialsService {
  async validate(
    email: string,
    password: string
  ): Promise<[boolean, string | User]> {
    email = email.trim().toLowerCase();
    const u = await dataSource
      .getRepository(User)
      .findOne({ where: { email } });

    if (u === null) return [false, 'User no existe'];

    const service = new PassService();
    const isOk = await service.comparePassword(password.trim(), u.password);

    if (isOk) {
      return [true, u];
    } else {
      return [false, 'Contraseña incorrecta'];
    }
  }
}
