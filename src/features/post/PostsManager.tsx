import React, { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../auth/authApi';
import { logout, selectIsAuthenticated } from '../auth/authSlice';

const PostsManager: FC = () => {
  const [login] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <h3>Posts</h3>
      {!isAuthenticated ? (
        <button
          className=""
          aria-label="Login"
          onClick={() => {
            login({ ignore: 'This will just set the headers' });
          }}
        >
          {' '}
          Login
        </button>
      ) : (
        <button
          className=""
          aria-label="Logout"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </button>
      )}
    </Fragment>
  );
};
export default PostsManager;
