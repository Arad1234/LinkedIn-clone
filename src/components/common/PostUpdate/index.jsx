import React, { useState } from "react";
import ModalComponent from "../Modal";
import { toast } from "react-toastify";
import { postStatus } from "../../../api/FirestoreAPIs";

import "./index.scss";

const PostStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  
  const createPost = async () => {
    try {
      const res = await postStatus(status);
      toast.success("Created a New Post!");
    } catch (error) {
      toast.error("Could Not Upload The Post");
    }
  };
  return (
    <div className="post-status-main">
      <div className="post-status">
        <button
          onClick={() => setShowModal(true)}
          className="open-post-modal"
        >
          Start a post
        </button>
        <ModalComponent
          setStatus={setStatus}
          status={status}
          showModal={showModal}
          setShowModal={setShowModal}
          createPost={createPost}
        />
      </div>
    </div>
  );
};

export default PostStatus;
