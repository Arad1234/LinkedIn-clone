import React, { useEffect, useState, useContext } from "react";
import { homeUserContext } from "../../../layouts/HomeLayout";
import { FaTrashAlt } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { getSingleUser } from "../../../api/FirestoreAPIs";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import "./index.scss";

const PostsCard = (props) => {
  const {
    post,
    setShowModal,
    setShowDeleteModal,
    setStatus,
    setEditMode,
    setPostID,
  } = props;
  const [user, setUser] = useState({});
  const currentUser = useContext(homeUserContext);
  // If the post is from the current user, the trash and pencil icon will be shown.
  const isCurrentUser = currentUser.id === user.id;
  const navigate = useNavigate();
  useEffect(() => {
    const closeConnection = getSingleUser(setUser, post.userID);
    return () => {
      closeConnection();
    };
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
    setStatus(post.status);
    setEditMode(true);
    setPostID(post.id);
  };

  // Opening modal and inserting the post id to the state.
  const handleTrashClick = () => {
    setShowDeleteModal(true);
    setPostID(post.id);
  };

  return (
    <div className="posts-card">
      <div className="header-container">
        <div className="profile-image-container">
          {/* Getting the profile image link for each user who upload a post. */}
          <img
            className="user-profile-image"
            src={user.ProfileImageUrl}
          />
        </div>
        <div>
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
        </div>
        {isCurrentUser && (
          <>
            <FaTrashAlt
              onClick={handleTrashClick}
              className="trash-icon"
            />
            <BiPencil
              onClick={handleEditClick}
              className="pencil-icon"
            />
          </>
        )}
      </div>
      <p className="status">{post.status}</p>
      <LikeButton
        postId={post.postID} // Using the "postID" propery to distinguish between posts..
      />
    </div>
  );
};

export default PostsCard;
