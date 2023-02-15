import React, { FC } from 'react';
import { Post, useAddPostMutation } from './postApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { is } from 'immer/dist/internal';

const PostAdd: FC = () => {
  const [addPost, { isLoading, isSuccess, isError, error }] =
    useAddPostMutation();
  const navigate = useNavigate();

  if (isSuccess) navigate('/');

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
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Partial<Post>) => {
    //console.log(JSON.stringify(data, null, 2));
    await addPost(data);
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
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Adding ...' : 'Add Post'}
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
export default PostAdd;
