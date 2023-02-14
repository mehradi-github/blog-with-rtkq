import { retry } from '@reduxjs/toolkit/dist/query';
import { api } from '../../app/services/api';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export const authApi = api.injectEndpoints({
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
} = authApi;
