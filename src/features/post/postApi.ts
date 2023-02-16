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
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: build.query<Post, number>({
      query: (id) => ({ url: `posts/${id}` }),
      providesTags: (_post, _err, id) => [{ type: 'Posts', id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (post) => [
        { type: 'Posts', id: post?.id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  endpoints: { getPosts },
} = postApi;
