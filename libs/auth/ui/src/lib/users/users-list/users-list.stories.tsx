import type { Meta } from '@storybook/react';
import { UsersList } from './users-list';

const Story: Meta<typeof UsersList> = {
  component: UsersList,
  title: 'UsersList',
};
export default Story;

const users = [
  {
    "id": 1,
    "name": "Admin",
    "email": "admin@starter.com",
    "isAdmin": false
  },
  {
    "id": 2,
    "name": "Hans Poo",
    "email": "hanspoo@gmail.com",
    "isAdmin": true
  }
]


export const Primary = {
  args: { users },
};
