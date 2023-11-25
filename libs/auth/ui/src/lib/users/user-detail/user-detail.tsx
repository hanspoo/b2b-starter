import { Col, Descriptions } from 'antd';
import { User } from '@starter-ws/db';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditUser from '../edit-user/edit-user';

const { Item } = Descriptions;

type UserDetailProps = {
  user: User;
};

const box: React.CSSProperties = {
  fontSize: '100px',
  backgroundColor: 'coral',
  height: '300px',
  width: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
};

const container: React.CSSProperties = {
  marginTop: '1em',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};
function UserDetail({ user }: UserDetailProps) {
  const [editar, setEditar] = useState(false);

  return (
    <div style={container}>
      <Col style={{ margin: '1em' }}>
        <div style={box}>{user.name.substring(0, 1).toUpperCase()}</div>
      </Col>
      <Col style={{ margin: '1em' }} span={16}>
        {editar ? (
          <EditUser user={user} cancelar={() => setEditar(false)} />
        ) : (
          <Descriptions column={1} layout="vertical">
            <Item label="name">
              {user.name}{' '}
              <EditOutlined
                onClick={() => setEditar(true)}
                style={{ color: 'brown', marginLeft: '1em' }}
              />
            </Item>
            <Item label="email">{user.email}</Item>
            <Item label="id">{user.id}</Item>
            <Item label="isAdmin">{user.isAdmin ? 'Yes' : 'No'}</Item>
          </Descriptions>
        )}
      </Col>
    </div>
  );
}

export { UserDetail };
