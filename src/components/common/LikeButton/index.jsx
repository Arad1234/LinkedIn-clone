import React from "react";
import "./index.scss";
import { AiOutlineLike } from "react-icons/ai";
const LikeButton = () => {
  const handleLike = () => {};
  return (
    <div
      onClick={handleLike}
      className="like-container"
    >
      <AiOutlineLike size={30} />
      <p>Like</p>
    </div>
  );
};

export default LikeButton;
