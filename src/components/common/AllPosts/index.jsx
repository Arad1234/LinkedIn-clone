import React, { useState, useContext, useEffect } from "react";
import ModalComponent from "../ModalComponent";
import { toast } from "react-toastify";
import PostsCard from "../PostsCard";
import { homeUserContext } from "../../../layouts/HomeLayout";
import { getUniqueID } from "../../../helpers/getUniqueID";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { postStatus, getPosts } from "../../../api/FirestoreAPIs";
import defaultUserPhoto from "../../../assets/defaultUser.png";
import "./index.scss";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [status, setStatus] = useState("");
  // Setting the loading state to be true when the component mounts to show the Loader component until I fetched all the data from the DB.
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  // Using the useContext hook to retrieve the current user from the 'HomeLayout' component.
  const currentUser = useContext(homeUserContext);
  // Check if the user has profile image.
  const profileImage = currentUser.ProfileImageUrl
    ? currentUser.ProfileImageUrl
    : defaultUserPhoto;

  const navigate = useNavigate();
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
      setShowCreatePostModal(false); // Setting the modal to disappear
      setStatus(""); // setting the status inside the modal to be an empty string.
    } catch (error) {
      toast.error("Could Not Upload The Post");
    }
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
          src={profileImage}
        />
        <label
          onClick={() =>
            navigate("/profile", { state: { id: currentUser.userID } })
          }
          className="user-name-card"
        >
          {currentUser.name}
        </label>
      </div>
      <div className="post-status">
        <img
          className="current-user-image"
          src={profileImage}
        />
        <button
          onClick={() => setShowCreatePostModal(true)}
          className="open-post-modal"
        >
          Start a post
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        status={status}
        showCreatePostModal={showCreatePostModal}
        setShowCreatePostModal={setShowCreatePostModal}
        createPost={createPost}
      />
      {/* I wrap the map function with a div element so that the list of items it generates can be displayed separately on the page. */}
      <div>
        {allPosts.map((post) => {
          return (
            <div key={post.postID}>
              <PostsCard post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPosts;
