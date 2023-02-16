import { rest } from 'msw';
import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { Post } from '../features/post/postApi';

const token = nanoid();

const adapter = createEntityAdapter<Post>();
let state = adapter.getInitialState();
state = adapter.setAll(state, [
  {
    id: 1,
    title: 'Culpa fugiat pariatur magna aliqua.',
    body: 'Qui duis fugiat exercitation eiusmod ipsum duis excepteur exercitation enim et nisi. Dolor ullamco sit dolore cupidatat id amet id veniam commodo irure minim. Ea sint ea ad excepteur duis eu. Dolore aliquip sunt officia enim cillum ex Lorem et mollit adipisicing proident.',
    fetched_at: new Date().toUTCString(),
  },

  {
    id: 2,
    title: 'Elit sit mollit voluptate enim et dolore eiusmod ex.',
    body: 'Culpa sint Lorem veniam reprehenderit enim consequat. Consequat ut ex mollit commodo consequat ullamco. Consectetur et exercitation sit est Lorem voluptate amet do magna officia adipisicing incididunt veniam. Consectetur fugiat do eiusmod occaecat irure ad amet occaecat est elit velit est nulla cupidatat. Excepteur exercitation pariatur aute voluptate cillum sunt sint sint cillum sunt laborum amet.',
    fetched_at: new Date().toUTCString(),
  },
]);

let startingId = 3;

export { state };

export const handlers = [
  // rest.post('/login', (req, res, ctx) => {
  //   return res.once(ctx.json({ message: 'I fail once.' }), ctx.status(500));
  // }),
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
  rest.get('/posts/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(ctx.json(state.entities[id]), ctx.delay(400));
  }),
  rest.post('/posts', async (req, res, ctx) => {
    const post = (await req.json()) as Partial<Post>;
    startingId += 1;
    state = adapter.addOne(state, { ...post, id: startingId } as Post);
    // console.log(state);
    return res(ctx.json(Object.values(state.entities)), ctx.delay(400));
  }),
  rest.delete('/posts/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    state = adapter.removeOne(state, id);
    return res(ctx.json({ id, success: true }), ctx.delay(400));
  }),
];
