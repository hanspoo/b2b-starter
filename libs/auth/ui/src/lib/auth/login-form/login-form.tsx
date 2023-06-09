import React, { useMemo, useState } from 'react';
import styles from '../../auth-form.module.css';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  notification,
  Typography,
} from 'antd';
import { LoginRequest } from '@starter-ws/auth/api';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '@starter-ws/reductor';
import Fader from '../../fader/fader';

const { Title } = Typography;

export const LoginForm: React.FC<{
  recoverPassword: () => void;
  goSignup: () => void;
}> = ({ goSignup, recoverPassword }) => {
  const [loading, setLoading] = useState(false);
  const [error, setRealError] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const dispatch = useDispatch();

  function setError(message: string) {
    setRealError(message);
    setTimeout(() => setRealError(''), 3000);
  }

  const onFinish = (values: any) => {
    let i = 0;
    console.log(i++);

    const { email, password } = values;

    setLoading(true);
    const data: LoginRequest = { email, password };
    console.log(i++);

    fetch(`/api/auth/login`, {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    })
      .then((response) => {
        console.log('response.headers', response.headers);

        const token = response.headers.get('x-token');
        if (!token) {
          console.log(`Info: No viene el token en la respuesta`);
        }

        response
          .text()
          .then((data) => {
            setLoading(false);
            if (data !== 'login Ok') {
              // api.error({
              //   message: `Problemas al iniciar la sesión`,
              //   description: data,
              //   placement: "top"
              // });
              // setLoading(false)
              setError(data);
            } else {
              console.log(i++);

              console.log(i++);
              console.log('el token es', token);

              if (token) dispatch(setLoggedIn(token));
              console.log(i++);
              // setLoading(false)
              console.log(i++);
            }
          })
          .catch((error) => {
            setError(JSON.stringify(error));
            setLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card title="Conexión al sistema" className={styles['login-form']}>
      <Form
        layout="vertical"
        className={styles['ant-form']}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Requerido' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Requerido' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 0 }}
        >
          <Checkbox>Recordarme en este equipo</Checkbox>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ marginRight: '0.1em' }}
            >
              Enviar
            </Button>
          </Form.Item>
          {error && (
            <Fader>
              <p style={{ color: 'red' }}>{error}</p>
            </Fader>
          )}
          <Button type="link" onClick={goSignup}>
            Registrar gratis
          </Button>
          <Button type="link" onClick={recoverPassword}>
            Olvidé la contraseña
          </Button>
        </div>
      </Form>
    </Card>
  );
};
