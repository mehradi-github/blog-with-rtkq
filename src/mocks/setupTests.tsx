import { mockServer } from './mockServer';

export const setupTests = () => {
  const { server, state: serverState } = mockServer();

  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return {
    serverState,
    server,
  };
};
