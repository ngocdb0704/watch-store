import { UserInfo } from '@/types/auth.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken?: string;
  userInfo?: UserInfo;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: undefined,
  userInfo: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential: (
      state,
      action: PayloadAction<{
        accessToken: string;
        userInfo: UserInfo
      }>) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.accessToken);
      }
    },
    restoreToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.userInfo = undefined;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
});

export const { setCredential, restoreToken, logout } = authSlice.actions;
export default authSlice.reducer;