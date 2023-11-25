import { RootState, setUsers } from '@starter-ws/reductor';
import { useEffect, useState } from 'react';

import { Spin } from 'antd';
import UsersList from '../users-list/users-list';
import { User } from '@starter-ws/db';
import { useHttpClient } from '../../useHttpClient';
import { useDispatch, useSelector } from 'react-redux';


/* eslint-disable-next-line */
export interface UsersContainerProps { }

export function UsersContainer(props: UsersContainerProps) {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.usersState)
  const httpClient = useHttpClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    httpClient
      .get('/api/users')
      .then((response) => {
        dispatch(setUsers(response.data));
        setLoading(false);
      })
      .catch((error) => { setError(error.message); setLoading(false); });
  }, []);

  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;
  if (!users) return <p>Error interno</p>;

  return <UsersList users={users} />;
}
