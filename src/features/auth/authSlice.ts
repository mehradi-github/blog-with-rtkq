import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/services/posts';
import { userApi } from '../../app/services/user';

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
      .addMatcher(userApi.endpoints.login.matchPending, (state, action) => {
        console.log('pending', action);
      })
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addMatcher(userApi.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action);
      });
  },
});
