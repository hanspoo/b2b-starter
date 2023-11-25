import { Me } from '@starter-ws/auth/api';
import { Organization, User } from '@starter-ws/db';
import express, { Request, Response } from 'express';

export const me = express.Router();

me.get('/', async function (req: Request, res: Response<Me>) {
  const u: User = req['user'];
  const e: Organization = req['organization'];
  const me: Me = {
    name: u.name,
    email: u.email,
    organization: e.name,
  };
  res.send(me);
});
