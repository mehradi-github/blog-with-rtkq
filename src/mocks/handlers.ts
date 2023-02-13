import { rest } from 'msw';
import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { Post } from '../app/services/posts';

const adapter = createEntityAdapter<Post>();
const token = nanoid();
let state = adapter.getInitialState();
state = adapter.setAll(state, [
  { id: 1, name: 'A sample post 1', fetched_at: new Date().toUTCString() },
  { id: 2, name: 'A sample post 2', fetched_at: new Date().toUTCString() },
]);

export { state };
export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res.once(ctx.json({ message: 'I fail once.' }), ctx.status(500));
  }),
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token,
        user: { first_name: 'firstName', last_name: 'lastName' },
      })
    );
  }),
  rest.get('/posts', (req, res, ctx) => {
    return res(ctx.json(Object.values(state.entities)));
  }),
];
