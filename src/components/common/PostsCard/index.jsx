import React, { useEffect, useState, useContext } from "react";
import { homeUserContext } from "../../../layouts/HomeLayout";
import { FaTrashAlt } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { getSingleUser, getConnections } from "../../../api/FirestoreAPIs";
import { useNavigate, useLocation } from "react-router-dom";
import LikeButton from "../LikeButton";
import "./index.scss";
import { profileUserContext } from "../../../layouts/ProfileLayout";

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
  const location = useLocation();
  // isConnected state is used to display only the posts of connected users.
  const [isConnected, setIsConnected] = useState(false);
  const currentHomeUser = useContext(homeUserContext);
  const currentProfileUser = useContext(profileUserContext);
  const currentUser =
    location.pathname === "/home" ? currentHomeUser : currentProfileUser;
  // If the post is from the current user, the trash and pencil icon will be shown.
  const isCurrentUser = currentUser.id === user.id;
  const navigate = useNavigate();
  useEffect(() => {
    const closeConnection = getSingleUser(setUser, post.userID);
    return () => {
      closeConnection();
    };
  }, []);
  useEffect(() => {
    // Here I get the connections of the current user and set the "isConnected" boolean accrodingly.
    getConnections(currentUser.userID, post.userID, setIsConnected);
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
    (isConnected || currentUser.userID === post.userID) && (
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
    )
  );
};

export default PostsCard;
