import React from "react";
import "./index.scss";
const PostsCard = (props) => {
  const { post } = props;
  return (
    <div className="posts-card">
      <p className="name">{post.name}</p>
      <p className="timestamp">{post.timeStamp}</p>
      <p className="status">{post.status}</p>
    </div>
  );
};

export default PostsCard;
