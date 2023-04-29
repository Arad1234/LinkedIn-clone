import React from "react";
import { Modal, Button } from "antd";

import "./index.scss";
const ModalComponent = (props) => {
  const { setStatus, status, showModal, setShowModal, createPost } = props;
  const clearModal = () => {
    setShowModal(false);
    setStatus("");
  };
  return (
    <div>
      <Modal
        title="Create a post"
        open={showModal}
        onCancel={clearModal}
        footer={[
          <Button
            onClick={createPost}
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
          placeholder="What do you want to talk about?"
          value={status}
        />
      </Modal>
    </div>
  );
};

export default ModalComponent;
