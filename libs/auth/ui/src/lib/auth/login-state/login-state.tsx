import { RootState } from '@starter-ws/reductor';
import { Button, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@starter-ws/reductor';
import styles from './login-state.module.css';
import { useEffect, useState } from 'react';
import { useHttpClient } from '../../useHttpClient';
import { Me } from '@starter-ws/auth/api';
import axios from 'axios';

/* eslint-disable-next-line */
export interface LoginStateProps {}

export function LoginState(props: LoginStateProps) {
  const httpClient = useHttpClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [me, setMe] = useState<Me>();

  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    httpClient
      .get(`${import.meta.env.VITE_SERVER_URL}/api/me`)
      .then((response) => {
        setMe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError(JSON.stringify(error));
        }

        setLoading(false);
      });
  }, []);

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  if (!loggedIn) return <p>Desconected</p>;

  const onLogout = () => {
    dispatch(logout());
  };

  if (loading) return <Spin size="small" />;

  return (
    <div className={styles['container']}>
      {error ? (
        <Button onClick={onLogout} type="link" style={{ color: 'red' }}>
          {error}
        </Button>
      ) : (
        <span>
          {me?.name} en {me?.organization}
          <br />
          <Button
            style={{ padding: 0 }}
            size="small"
            type="link"
            onClick={onLogout}
          >
            <small>Close session</small>
          </Button>
        </span>
      )}
    </div>
  );
}

export default LoginState;
