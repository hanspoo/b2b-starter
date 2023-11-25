import { Breadcrumb, Table } from 'antd';
import styles from './users-list.module.css';
import { User } from '@starter-ws/db';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface usersListProps {
  users: User[];
}

const crumbs = [
  { title: <Link to="/">home</Link> },
  { title: <Link to="/users">users</Link> },
];

export function UsersList({ users }: usersListProps) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      render: (name: string, row: User) => (
        <Link to={`/users/${row.id}`}>{name}</Link>
      ),
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: 'isAdmin',
      dataIndex: 'isAdmin',
      render: (isAdmin: boolean) =>
        isAdmin ? <CheckOutlined /> : <CloseOutlined />,
    },
  ];

  return (
    <div className={styles['container']}>
      <Breadcrumb items={crumbs} />
      <Table
        style={{ marginTop: '1em' }}
        dataSource={users}
        columns={columns}
        rowKey={() => 'id'}
      />
    </div>
  );
}

export default UsersList;
