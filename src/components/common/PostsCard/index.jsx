import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import "./index.scss";
const PostsCard = (props) => {
  const { post } = props;
  const navigate = useNavigate();
  return (
    <div className="posts-card">
      <p
        onClick={() =>
          navigate("/profile", {
            state: { id: post.userID }, // Passing data that can be accessed from the components that are rendered in the /profile url.
          })
        }
        className="name"
      >
        {post.name}
      </p>
      <p className="timestamp">{post.timeStamp}</p>
      <p className="status">{post.status}</p>
      <LikeButton
        postId={post.postID} // Using the "postID" propery to distinguish between posts..
      />
    </div>
  );
};

export default PostsCard;
