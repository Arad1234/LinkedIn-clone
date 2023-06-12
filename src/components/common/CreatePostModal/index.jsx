import React from "react";
import { Modal, Button } from "antd";

import "./index.scss";
const CreatePostModal = (props) => {
  const {
    setStatus,
    status,
    showCreatePostModal,
    setShowCreatePostModal,
    createPost,
  } = props;
  const clearModal = () => {
    setShowCreatePostModal(false);
    setStatus("");
  };
  return (
    <div>
      <Modal
        title={"Create a post"}
        open={showCreatePostModal}
        onCancel={clearModal}
        footer={[
          <Button
            onClick={createPost} // Calling the function at the parent component
            key="submit"
            type="primary"
            disabled={!status.trim().length} // If there is a text, the "disabled" property is set to false.
          >
            Post
          </Button>,
        ]}
      >
        <input
          onChange={(event) => setStatus(event.target.value)}
          className="modal-input"
          placeholder={"What do you want to talk about?"}
          value={status}
        />
      </Modal>
    </div>
  );
};

export default CreatePostModal;
