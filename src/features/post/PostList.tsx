import { MDBBtn } from 'mdb-react-ui-kit';
import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../auth/authSlice';
import { Post, useGetPostsQuery } from './postApi';

const AddPost = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-end my-5 mx-3">
      <MDBBtn color="success" className="me-1" onClick={() => navigate('/add')}>
        Add Post
      </MDBBtn>
    </div>
  );
};

const ListItem = ({
  data: { id, title, body },
  onSelect,
}: {
  data: Post;
  onSelect: (id: number) => void;
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
      </div>
      <button
        type="button"
        className="btn btn-link"
        data-mdb-ripple-color="dark"
        onClick={() => onSelect(id)}
      >
        Read More
      </button>
    </div>
  );
};

const List = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(posts);
  if (!posts) {
    return <div>No Posts!</div>;
  }
  return (
    <div>
      {posts.map((post) => (
        <ListItem
          key={post.id}
          data={post}
          onSelect={(id) => navigate(`/${id}`)}
        />
      ))}
    </div>
  );
};

const PostList: FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Fragment>
      {isAuthenticated ? <AddPost /> : ''}
      <List />
    </Fragment>
  );
};
export default PostList;
