import { api } from '../../app/services/api';

export interface Post {
  id: number;
  title: string;
  body: string;
  fetched_at: string;
}

type PostResponse = Post[];

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostResponse, void>({
      query: () => ({ url: 'posts' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
        { type: 'Posts' as const, id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  endpoints: { getPosts },
} = postApi;
