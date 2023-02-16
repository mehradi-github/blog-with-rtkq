import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Post, useGetPostQuery } from './postApi';

const PostDetail = () => {
  const { id } = useParams<{ id: any }>();

  const { data, isLoading } = useGetPostQuery(Number(id));
  const { title, body } = data as Post;
  return (
    <div className="card">
      <div className="card-body">
        {isLoading ? (
          <div>Loding ...</div>
        ) : (
          <Fragment>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default PostDetail;
