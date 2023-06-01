import React, { useState, useContext, useEffect, useMemo } from "react";
import ModalComponent from "../ModalComponent";
import { toast } from "react-toastify";
import PostsCard from "../PostsCard";
import { homeUserContext } from "../../../layouts/HomeLayout";
import { getUniqueID } from "../../../helpers/getUniqueID";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { postStatus, getPosts } from "../../../api/FirestoreAPIs";

import "./index.scss";
import Loader from "../Loader";

const PostStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [allPosts, setAllPosts] = useState([]);
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
  // Getting all the posts with the "getPosts" function from the firestore API file.
  useEffect(() => {
    const closeConnection = getPosts(setAllPosts);
    return () => {
      closeConnection();
    };
  }, []);
  // If the app hasn't yet fetched all the posts, render the Loader component.
  if (allPosts.length === 0) {
    return <Loader />;
  }
  return (
    <div className="post-status-main">
      <div className="post-status">
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
      />
      {/* "We wrap the map function with a div element so that the list of items it generates can be displayed separately on the page." */}
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

export default PostStatus;
