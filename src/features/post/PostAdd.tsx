import React, { FC } from 'react';

const PostAdd: FC = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="d-flex justify-content-center mt-5 ">
      <form className="w-50">
        <div className="form-outline mb-4">
          <input
            type="text"
            id="title"
            className="form-control border border-1"
          />
          <label className="form-label" htmlFor="title">
            Title
          </label>
        </div>
        <div className="form-outline mb-4">
          <textarea
            rows={4}
            id="body"
            className="form-control border border-1"
          />
          <label className="form-label" htmlFor="body">
            Body
          </label>
        </div>

        <button type="submit" className="btn btn-success btn-block">
          Add
        </button>
      </form>
    </div>
  );
};
export default PostAdd;
