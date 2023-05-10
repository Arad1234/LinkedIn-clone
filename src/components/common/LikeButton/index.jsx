import React, { useEffect, useState, useContext } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from "../../../api/FirestoreAPIs";
// Import 2 contexts, 1 for each route
import { profileUserContext } from "../../../layouts/ProfileLayout";
import { homeUserContext } from "../../../layouts/HomeLayout";

import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import { useLocation } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import Comments from "../Comments";
const LikeButton = (props) => {
  // I need to determine the appropriate context to use based on the current route the user is on, since I'm using two different contexts for each route (/home, /profile).
  const profileCurrentUser = useContext(profileUserContext);
  const homeCurrentUser = useContext(homeUserContext);
  // Using the useLocation hook to find the route that the user is currently on.
  const location = useLocation();
  let currentUser = "";
  location.pathname === "/home"
    ? (currentUser = homeCurrentUser)
    : (currentUser = profileCurrentUser);

  const { postId } = props;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [likedPost, setLikedPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [numberOfLikesPerPost, setNumberOfLikesPerPost] = useState(0);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const addComment = async () => {
    const currentTimeStamp = getCurrentTimeStamp("LLL"); // Using the helper function from "helpers" folder.
    try {
      await postComment(postId, currentUser.name, comment, currentTimeStamp);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  // When the current user click the like button, it will check if he already liked it.
  const handleLike = () => {
    likePost(currentUser.id, postId, likedPost);
  };
  // This useEffect will executes the number of posts that is currently in the "allPosts" array.
  // This is because this component will be rendered "allPosts.length" times.
  useEffect(() => {
    // Getting the number of likes for each post.
    const closeLikesConnection = getLikesByUser(
      currentUser.id,
      postId,
      setNumberOfLikesPerPost,
      setLikedPost
    );
    const closeCommentsConnection = getComments(postId, setAllComments); // Getting all the comments per post.
    return () => {
      // Returning the onSnapshot function so I can close the webSocket connection when the component is unmounts.
      closeCommentsConnection();
      closeLikesConnection();
    };
  }, []);

  return (
    <div className="like-container">
      <p>{numberOfLikesPerPost} People Like this post</p>
      {/* I wrapped the <hr/> element with a <div/> because he does not have a closing tag which can cause the browser to have difficulty rendering it correctly */}
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment-container">
        <div
          onClick={handleLike}
          className="likes-comment-inner"
        >
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
        <div
          onClick={handleShowComments}
          className="likes-comment-inner"
        >
          <AiOutlineComment
            size={30}
            color={showComments ? "#0a66c2" : "#212121"}
          />

          <p className={showComments ? "blue" : "black"}>Comment</p>
        </div>
      </div>
      {showComments && (
        <>
          <input
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            value={comment}
          />
          {comment.trim().length > 0 && (
            <button
              onClick={addComment}
              className="add-comment-btn"
            >
              Post
            </button>
          )}

          {allComments.length > 0 &&
            allComments.map((commentObj) => {
              return (
                <div key={commentObj.id}>
                  <Comments commentObj={commentObj} />
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default LikeButton;
