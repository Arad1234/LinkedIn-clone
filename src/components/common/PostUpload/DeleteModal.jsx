import React from "react";
import { Modal } from "antd";

const DeleteModal = (props) => {
  const { setShowDeleteModal, showDeleteModal, handleDeletePost, postID } =
    props;
  return (
    <Modal
      title="Delete Post"
      open={showDeleteModal}
      okText="Delete"
      onOk={() => handleDeletePost(postID)}
      onCancel={() => setShowDeleteModal(false)}
    ></Modal>
  );
};

export default DeleteModal;
