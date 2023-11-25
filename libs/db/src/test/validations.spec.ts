import { inicializarSistema } from '../lib/initSystem';
import { Validacion } from '../lib/users/Validation';
import { BuilderUsers } from './UsersBuilder';

beforeAll(async () => {
  await inicializarSistema();
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
  it('User de otra organization no puede modificar', async () => {
    const [luke] = await new BuilderUsers().build();
    const [goku] = await new BuilderUsers().build();

    const error = Validacion.puedeModificar(luke, goku);
    expect(error).toBeTruthy();
  });
  it('User misma organization no admin no puede modificar', async () => {
    const [luke, han] = await new BuilderUsers().build();

    const error1 = Validacion.puedeModificar(luke, han);
    expect(error1).toBeTruthy();
    const error2 = Validacion.puedeModificar(han, luke);
    expect(error2).toBeTruthy();
  });
  it('User misma organization admin lo puede modificar', async () => {
    const [luke, han, yoda] = await new BuilderUsers().build();

    const error = Validacion.puedeModificar(yoda, han);
    expect(error).toBe('');
  });
  it('se puede modificar a si mismo', async () => {
    const [luke] = await new BuilderUsers().build();

    const error = Validacion.puedeModificar(luke, luke);
    expect(error).toBe('');
  });
});
