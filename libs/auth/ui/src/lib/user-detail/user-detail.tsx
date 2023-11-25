import { Descriptions } from 'antd';
import { User } from '@starter-ws/db';

const { Item } = Descriptions;

type UserDetailProps = {
  user: User
}


function UserDetail({ user }: UserDetailProps) {

  return <Descriptions bordered column={1} >
    <Item label="id">{user.id}</Item>
    <Item label="name">{user.name}</Item>
    <Item label="email">{user.email}</Item>
  </Descriptions>

}

export { UserDetail }

