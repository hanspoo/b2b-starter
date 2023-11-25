import { Breadcrumb } from 'antd';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RootState } from '@starter-ws/reductor';
import { UserDetail } from './user-detail/user-detail';
import { crumbs } from './crumbs';

export function UserDetailFromRouter() {
  const { users } = useSelector((state: RootState) => state.usersState);
  const { id } = useParams();

  const user = users?.find((u) => u.id === id);
  return (
    <div>
      <Breadcrumb
        items={[...crumbs, { title: user?.name.toLocaleLowerCase() }]}
      />

      {user ? (
        <UserDetail user={user} />
      ) : (
        <p>Error al recuperar user {id} </p>
      )}
    </div>
  );
}
