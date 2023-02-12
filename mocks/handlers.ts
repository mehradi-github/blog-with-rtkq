import { rest } from 'msw';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { Post } from '../app/services/posts';

const adapter = createEntityAdapter<Post>();

let state = adapter.getInitialState();
state = adapter.setAll(state, [
  { id: 1, name: 'A sample post 1', fetched_at: new Date().toUTCString() },
  { id: 2, name: 'A sample post 2', fetched_at: new Date().toUTCString() },
]);

export { state };
export const handlers = [
  rest.get('/posts', (req, res, ctx) => {
    return res(ctx.json(Object.values(state.entities)));
  }),
];
