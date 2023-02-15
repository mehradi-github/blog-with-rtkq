import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams<{ id: any }>();
  return <div>PostDetail {id}</div>;
};
export default PostDetail;
