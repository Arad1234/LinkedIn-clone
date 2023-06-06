import { Modal, Button } from "antd";
import React from "react";

const EditPostModal = (props) => {
  const {
    setShowEditModal,
    showEditModal,
    handleUpdatePost,
    postStatus,
    setPostStatus,
  } = props;
  return (
    <div>
      <Modal
        title={"Edit post"}
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={[
          <Button
            onClick={handleUpdatePost} // Calling the function at the parent component
            key="submit"
            type="primary"
            disabled={!postStatus.length} // If there is a text, the "disabled" property is set to false.
          >
            Post
          </Button>,
        ]}
      >
        <input
          onChange={(event) => setPostStatus(event.target.value)}
          className="modal-input"
          value={postStatus}
        />
      </Modal>
    </div>
  );
};

export default EditPostModal;
