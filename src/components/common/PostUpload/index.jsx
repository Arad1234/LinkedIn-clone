import React, { useState, useContext, useEffect } from "react";
import ModalComponent from "../ModalComponent";
import { toast } from "react-toastify";
import PostsCard from "../PostsCard";
import { homeUserContext } from "../../../layouts/HomeLayout";
import { getUniqueID } from "../../../helpers/getUniqueID";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import {
  postStatus,
  getPosts,
  updatePostStatus,
  deletePost,
} from "../../../api/FirestoreAPIs";
import defaultUserPhoto from "../../../assets/defaultUser.png";
import "./index.scss";
import Loader from "../Loader";
import DeleteModal from "./DeleteModal";

const PostStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [status, setStatus] = useState("");
  const [editMode, setEditMode] = useState(false);
  // Setting the loading state to be true when the component mounts to show the Loader component until I fetched all the data from the DB.
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [postID, setPostID] = useState("");
  // Using the useContext hook to retrieve the current user from the 'HomeLayout' component.
  const currentUser = useContext(homeUserContext);
  // Create a new post - adds a new document to the 'posts' collection.
  const createPost = async () => {
    const postData = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      name: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.userID, // Here I add the userId to know which user upload that specific post.
    };
    try {
      await postStatus(postData); // Creates a new post with the firestore API that I designed.
      toast.success("Post has been added successfully");
      setShowModal(false); // Setting the modal to disappear
      setStatus(""); // setting the status inside the modal to be an empty string.
    } catch (error) {
      toast.error("Could Not Upload The Post");
    }
  };
  console.log(currentUser);
  const updatePost = () => {
    updatePostStatus(status, postID);
    setShowModal(false);
    setStatus("");
    setEditMode(false);
    toast.success("Post has been updated successfully");
  };

  const handleDeletePost = async (postID) => {
    await deletePost(postID);
    setShowDeleteModal(false);
    toast.success("Post has been deleted successfully");
  };
  // Getting all the posts with the "getPosts" function from the firestore API file.
  useEffect(() => {
    const closeConnection = getPosts(setAllPosts, setLoading);
    return () => {
      closeConnection();
    };
  }, []);
  // If the app hasn't yet fetched all the posts, render the Loader component.
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="post-status-main">
      <div className="post-status">
        <img
          className="profile-image-card"
          src={
            currentUser.ProfileImageUrl
              ? currentUser.ProfileImageUrl
              : defaultUserPhoto
          }
        />
        <label className="user-name-card">{currentUser.name}</label>
      </div>
      <div className="post-status">
        <img
          className="current-user-image"
          src={currentUser.ProfileImageUrl}
        />
        <button
          onClick={() => setShowModal(true)}
          className="open-post-modal"
        >
          Start a post
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        status={status}
        showModal={showModal}
        setShowModal={setShowModal}
        createPost={createPost}
        setEditMode={setEditMode}
        editMode={editMode}
        updatePost={updatePost}
      />
      {/* Created a modal to handle post deletion. */}
      <DeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        handleDeletePost={handleDeletePost}
        postID={postID}
      />
      {/* "We wrap the map function with a div element so that the list of items it generates can be displayed separately on the page." */}
      <div>
        {allPosts.map((post) => {
          return (
            <div key={post.postID}>
              <PostsCard
                post={post}
                setShowModal={setShowModal}
                setShowDeleteModal={setShowDeleteModal}
                setStatus={setStatus}
                setEditMode={setEditMode}
                setPostID={setPostID}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostStatus;
