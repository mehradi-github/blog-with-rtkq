import React, { FC, useEffect, useState } from 'react';
import { Post, useGetPostQuery, useUpdatePostMutation } from './postApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectIsAuthenticated } from '../auth/authSlice';

const PostEdit: FC = () => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const postId = Number(id);
  const { data: post, isLoading: isLoadingGet } = useGetPostQuery(postId);
  const [updatePost, { isLoading, isSuccess }] = useUpdatePostMutation();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    body: Yup.string()
      .required('Body is required')
      .min(20, 'Body must be at least 20 characters')
      .max(200, 'Body must not exceed 200 characters'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<Post>>({
    defaultValues: {
      title: post?.title,
      body: post?.body,
    },
    resolver: yupResolver(validationSchema),
  });

  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');

  // useEffect(() => {
  //   if (isSuccess) {
  //     setTitle(post.title);
  //     setBody(post.body);
  //   }
  // }, [isSuccess, post?.title, post?.body]);

  // if (isSuccess) navigate('/');

  if (isLoadingGet) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="d-flex justify-content-center mt-5">Missing post!</div>
    );
  }

  // const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  // const onBodyChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);

  const onSubmit = async (data: Partial<Post>) => {
    console.log({ ...data });
    try {
      await updatePost({ id: post.id, ...data }).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Failed to update the post', err);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 ">
      <form className="w-50" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className={`form-control border border-1 ${
              errors.title ? 'is-invalid' : ''
            }`}
            {...register('title')}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>
        <div className="form-group mb-4">
          <label className="form-label" htmlFor="body">
            Body
          </label>
          <textarea
            rows={4}
            id="body"
            className={`form-control border border-1 ${
              errors.body ? 'is-invalid' : ''
            }`}
            {...register('body')}
          />
          <div className="invalid-feedback">{errors.body?.message}</div>
        </div>
        <div className="form-group d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary me-1"
            disabled={isLoading}
          >
            {isLoading ? 'Updateing ...' : 'Update'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
export default PostEdit;
