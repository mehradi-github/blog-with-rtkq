import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { RootState } from '../store';

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: '/',
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
          headers.set('authentication', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    { maxRetries: 3 }
  ),
  tagTypes: ['Posts'],
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  endpoints: () => ({}),
});
