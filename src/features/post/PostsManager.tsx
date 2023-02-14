import React, { FC, Fragment } from 'react';
import { Button } from 'react-bootstrap';
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
        <Button
          variant="primary"
          aria-label="Login"
          onClick={() => {
            login({ ignore: 'This will just set the headers' });
          }}
        >
          {' '}
          Login
        </Button>
      ) : (
        <Button
          variant="danger"
          aria-label="Logout"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      )}
    </Fragment>
  );
};
export default PostsManager;
