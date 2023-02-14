import { createSlice } from '@reduxjs/toolkit';
import { authApi, User } from './authApi';
import { RootState } from '../../app/store';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
} as { user: null | User; token: string | null; isAuthenticated: boolean };

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
        console.log('pending', action);
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
