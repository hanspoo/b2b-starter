import * as express from 'express';
import { Request, Response } from 'express';

import { dataSource, Organization, User, Validacion } from '@starter-ws/db';

const users = express.Router();
users.get('/', async function (req: Request, res: Response) {
  const e: Organization = req['organization'];
  const list = await dataSource
    .getRepository(User)
    .find({ where: { organization: e } });
  res.json(
    list.map((u) => {
      delete u.password;
      return u;
    })
  );
});

users.post('/', async (req: Request & { organization: Organization }, res) => {
  const repo = dataSource.getRepository(User);

  const user: User = repo.create(req.body) as any as User;
  user.organization = req.organization;

  const nuevoUser = await repo.save(user);

  res.send(nuevoUser);
});

users.put(
  '/:id',
  async (
    req: { user: User } & Request<{ id: string }, any, Partial<User>>,
    res
  ) => {
    // recuperar el user que hay que modificar

    const { id } = req.params;
    const repo = dataSource.getRepository(User);
    const userModificar = await repo.findOne({
      where: { id },
      relations: ['organization'],
    });
    if (!userModificar)
      return res.status(404).send(`User ${id} no encontrado`);

    const error = Validacion.puedeModificar(req.user, userModificar);
    if (error) {
      return res.status(401).send(error);
    }

    userModificar.email = req.body.email;
    userModificar.name = req.body.name;

    const modificado = await repo.save(userModificar);
    delete modificado.password;
    res.send(modificado);
  }
);
// users.get(
//   '/:id',
//   async function (req: Request<{ id: number }>, res: Response) {
//     if (!req.params.id)
//       return res
//         .status(400)
//         .send('No viene el id de user: ' + req.params.id);
//     const user = await dataSource
//       .getRepository(User)
//       .findOne({ where: { id: req.params.id } });
//     if (!user)
//       return res.status(404).send(`User ${req.params.id} no encontrado`);
//     return res.send(user);
//   }
// );

// const upload = multer({ dest: UPLOAD_FOLDER });
// users.post('/', upload.single('file'), async function (req: any, res) {
//   console.log(req.file);

//   const user = await dataSource.getRepository(User).create(req.file);
//   const results = await dataSource.getRepository(User).save(user);
//   return res.send(results);
// });

// users.put('/:id', async function (req: Request, res: Response) {
//   const user = await dataSource.getRepository(User).findOneBy({
//     id: req.params.id as unknown as number,
//   });
//   dataSource.getRepository(User).merge(user, req.body);
//   const results = await dataSource.getRepository(User).save(user);
//   return res.send(results);
// });

// users.delete('/:id', async function (req: Request, res: Response) {
//   const results = await dataSource.getRepository(User).delete(req.params.id);
//   return res.send(results);
// });

export { users };
