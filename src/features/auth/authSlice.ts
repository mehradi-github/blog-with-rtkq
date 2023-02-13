import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/services/posts';

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
});
