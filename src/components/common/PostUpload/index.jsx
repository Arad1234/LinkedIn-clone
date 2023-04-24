import React, { useState, useMemo } from "react";
import ModalComponent from "../Modal";
import { toast } from "react-toastify";
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { postStatus, getPosts } from "../../../api/FirestoreAPIs";

import "./index.scss";

const PostStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const userEmail = localStorage.getItem("userEmail"); // Getting the user's email from the local storage. I stored the email when the user is registered or signed in.
  // Create a new post - add a new document to the DB.
  const createPost = async () => {
    const postData = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: userEmail,
    };
    try {
      const res = await postStatus(postData); // Creates a new post with the firestore API that I designed.
      toast.success("Created a New Post!");
      setShowModal(false); // Setting the modal to disappear
      setStatus(""); // setting the status inside the modal to be an empty string.
    } catch (error) {
      toast.error("Could Not Upload The Post");
    }
  };
  // Getting all the posts with the "getPosts" function from the firestore API file.
  useMemo(() => {
    getPosts(setAllPosts);
  }, []);

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
            <div key={post.id}>
              <PostsCard post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostStatus;