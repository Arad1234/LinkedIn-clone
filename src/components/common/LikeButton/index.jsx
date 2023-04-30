import React, { useEffect, useState } from "react";
import { likePost, getLikesByUser } from "../../../api/FirestoreAPIs";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const LikeButton = (props) => {
  const { userId, postId } = props;
  const [likedPost, setLikedPost] = useState(false);
  const [numberOfLikesPerPost, setNumberOfLikesPerPost] = useState(0);
  // When the current user click the like button, it will check if he already liked it.
  const handleLike = () => {
    likePost(userId, postId, likedPost);
  };
  // This useEffect will executes the number of posts that is currently in the "allPosts" array.
  // This is because this component will be rendered "allPosts.length" times.
  // I'm using useEffect because I have setState inside of it.
  useEffect(() => {
    getLikesByUser(userId, postId, setNumberOfLikesPerPost, setLikedPost); // Getting the number of likes for each post.
  }, []);

  return (
    <div
      onClick={handleLike}
      className="like-container"
    >
      <p>{numberOfLikesPerPost} People Like this post</p>
      {/* I wrapped the <hr/> element with a <div/> because he does not have a closing tag which can cause the browser to have difficulty rendering it correctly */}
      <div className="hr-line">
        <hr />
      </div>

      <div className="likes-inner">
        {likedPost ? (
          <AiFillHeart
            size={30}
            color="#0a66c2"
          />
        ) : (
          <AiOutlineHeart size={30} />
        )}
        <p className={likedPost ? "blue" : "black"}>Like</p>
      </div>
    </div>
  );
};

export default LikeButton;
