import React from "react";
import { Modal, Button } from "antd";

import "./index.scss";
const ModalComponent = (props) => {
  const {
    setStatus,
    status,
    showModal,
    setShowModal,
    createPost,
    setEditMode,
    editMode,
    updatePost,
  } = props;
  const clearModal = () => {
    setShowModal(false);
    setEditMode(false);
    setStatus("");
  };
  return (
    <div>
      <Modal
        title={editMode ? "Edit post" : "Create a post"}
        open={showModal}
        onCancel={clearModal}
        footer={[
          <Button
            onClick={editMode ? updatePost : createPost} // Calling the function at the parent component
            key="submit"
            type="primary"
            disabled={!status.length} // If there is a text, the "disabled" property is set to false.
          >
            Post
          </Button>,
        ]}
      >
        <input
          onChange={(event) => setStatus(event.target.value)}
          className="modal-input"
          placeholder={editMode ? "" : "What do you want to talk about?"}
          value={status}
        />
      </Modal>
    </div>
  );
};

export default ModalComponent;
