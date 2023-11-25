import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@starter-ws/db';

export interface UsersState {
  users?: Array<User>;
}

const initialState: UsersState = {
  users: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUsers: (state, action: PayloadAction<Array<User>>) => {
      if (!action.payload) {
        console.log('Debe entregar los users');
        return;
      }

      return { ...state, users: action.payload };
    },
    actualizarUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      if (!state.users) return { users: [user] };

      return {
        ...state,
        users: state.users.map((u) =>
          u.id === user.id ? user : u
        ),
      };
    },
  },
});

export const { setUsers, actualizarUser } = usersSlice.actions;

// export default usersSlice.reducer;
