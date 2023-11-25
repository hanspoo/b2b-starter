import { useState } from 'react';
import { Alert, Button, Form, Input, Spin } from 'antd';
import { User } from '@starter-ws/db';

import { useDispatch } from 'react-redux';
import { useHttpClient } from '../../useHttpClient';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { actualizarUser } from '@starter-ws/reductor';

type EditUserProps = {
  user: User;
  cancelar(): void;
};

export function EditUser({ user, cancelar }: EditUserProps) {
  const dispatch = useDispatch();
  const httpClient = useHttpClient();

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean>();
  const [error, setError] = useState('');

  const onFinish = (values: any) => {
    setLoading(true);

    httpClient
      .put(`/api/users/${user.id}`, values)
      .then((response) => {
        setOk(true);
        dispatch(actualizarUser(response.data as User));
        setLoading(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error.response.data));
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;

  if (ok === true)
    return (
      <div>
        <span>
          <span>
            <div>
              <Alert
                message="Actualización de user"
                description={
                  <div>
                    <p>User updated.</p>
                    <Button onClick={cancelar}>Continue</Button>
                  </div>
                }
                type="success"
                showIcon
              ></Alert>
            </div>
          </span>
        </span>
      </div>
    );

  return (
    <Form
      layout="vertical"
      name="editar-user"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        remember: true,
        name: user.name,
        email: user.email,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Por favor ingrese su name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Por favor ingrese su email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
        <Button
          style={{ marginLeft: '0.25em' }}
          htmlType="button"
          onClick={cancelar}
        >
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditUser;
