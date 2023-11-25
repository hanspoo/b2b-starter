import { Button, Modal, Table, Typography } from 'antd';
import styles from './users-list.module.css';
import { User } from '@starter-ws/db';
import { useState } from 'react';
import { UserDetail } from '../user-detail/user-detail';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;
/* eslint-disable-next-line */
export interface usersListProps {
  users: User[];
}

export function UsersList({ users }: usersListProps) {
  const [user, setUser] = useState<User>();

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      render: (id: string) => (
        <Button
          type="link"
          onClick={() => setUser(users.find((u) => u.id === id))}
        >
          {id}
        </Button>
      ),
      sorter: (a: User, b: User) => a.id.localeCompare(b.id),
    },
    {
      title: 'name',
      dataIndex: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    { title: 'isAdmin', dataIndex: 'isAdmin', render: (isAdmin: boolean) => isAdmin ? <CheckOutlined /> : <CloseOutlined /> },
  ];

  const handleOk = () => {
    setUser(undefined);
  };

  const handleCancel = () => {
    setUser(undefined);
  };

  return (
    <div className={styles['container']}>
      <Title level={3}>Users</Title>
      {user && (
        <Modal
          title={user.name}
          open={!!user}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          width={800}
        >
          <UserDetail user={user} />
        </Modal>
      )}
      <Table dataSource={users} columns={columns} rowKey={() => 'id'} />
    </div>
  );
}

export default UsersList;
