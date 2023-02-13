import { retry } from '@reduxjs/toolkit/dist/query';
import { api } from './api';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string; user: User }, any>({
      query: (credentials: any) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          retry.fail({ fake: 'error' });
        },
      },
    }),
  }),
});

export const {
  useLoginMutation,
  endpoints: { login },
} = userApi;
