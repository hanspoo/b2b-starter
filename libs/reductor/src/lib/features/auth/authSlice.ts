import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  loggedIn: boolean;
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  token: '',
  loggedIn: false,
  value: 0,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoggedIn: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        console.log('setLoggedIn, error, no viene el token');
        return;
      }

      state.loggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = '';
    },
  },
});

export const { setLoggedIn, logout } = authSlice.actions;

// export default authSlice.reducer;
