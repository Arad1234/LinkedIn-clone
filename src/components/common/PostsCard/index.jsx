import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../layouts/HomeLayout";
import LikeButton from "../LikeButton";
import "./index.scss";
const PostsCard = (props) => {
  const currentUser = useContext(userContext);
  const { post } = props;
  const navigate = useNavigate();
  return (
    <div className="posts-card">
      <p
        onClick={() =>
          navigate("/profile", {
            state: { id: post.userID, email: post.userEmail }, // Passing data that can be accessed from the components that are rendered in the /profile url.
          })
        }
        className="name"
      >
        {post.name}
      </p>
      <p className="timestamp">{post.timeStamp}</p>
      <p className="status">{post.status}</p>
      <LikeButton
        userId={currentUser.id} // I added the 'id' property when I found who is the current user (firestore API file).
        postId={post.id} // Accessing the built in 'id' that firebase provided to this post.
      />
    </div>
  );
};

export default PostsCard;
