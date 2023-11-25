import { useState } from 'react';
import styles from '../../auth-form.module.css';
import { Button, Form, Input, Select, Spin } from 'antd';
import { CompanyData } from '../CompanyData';

type RecoverComponentsArgs = {
  cancel: () => void;
  next: (companyData: CompanyData) => void;
};
type Pais = {
  sigla: string;
  name: string;
};

const paises: Array<Pais> = [
  { name: 'Chile', sigla: 'cl' },
  { name: 'Perú', sigla: 'pe' },
  { name: 'Colombia', sigla: 'co' },
  { name: 'Brasil', sigla: 'br' },
  { name: 'Argentina', sigla: 'ar' },
];
export function SignupReadCompanyData({ cancel, next }: RecoverComponentsArgs) {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      next(values);
      setLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      className={styles['ant-form']}
      name="company-data"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <p>Complete los datos de su organization.</p>

      <Form.Item
        label="Nombre organization"
        name="organization"
        rules={[{ required: true, message: 'Requerido', min: 1 }]}
      >
        <Input autoFocus placeholder="" />
      </Form.Item>

      <Form.Item
        label="RUT o identificador legal"
        name="identLegal"
        rules={[{ required: true, message: 'Requerido', min: 6 }]}
      >
        <Input placeholder="" />
      </Form.Item>
      <Form.Item name="pais" label="País" rules={[{ required: true }]}>
        <Select>
          {paises.map(({ sigla, name }) => (
            <Select.Option value={sigla}>{name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div style={{ textAlign: 'center' }}>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ marginRight: '0.1em' }}
          >
            {loading ? <Spin /> : 'Enviar'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
