import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post, useDeletePostMutation, useGetPostQuery } from './postApi';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const postId = Number(id);
  const [deletePost, { isSuccess }] = useDeletePostMutation();
  if (isSuccess) navigate('/');
  const { data: post, isLoading } = useGetPostQuery(postId);

  if (isLoading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="d-flex justify-content-center mt-5">Missing post!</div>
    );
  }
  const { title, body } = post as Post;
  return (
    <div>
      <div className="d-flex my-5 mx-3 justify-content-end">
        <button
          type="button"
          className="btn btn-success me-1"
          onClick={() => navigate(`/post/edit/${postId}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deletePost(postId)}
        >
          Delete
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
