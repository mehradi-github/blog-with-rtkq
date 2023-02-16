import React from 'react';
import { useParams } from 'react-router-dom';
import { Post, useGetPostQuery } from './postApi';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading } = useGetPostQuery(Number(id));

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
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
      </div>
    </div>
  );
};
export default PostDetail;
