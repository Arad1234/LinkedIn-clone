import React, { useRef } from "react";
import "./index.scss";
import { Modal } from "antd";
import { AiFillCamera } from "react-icons/ai";
import { Space, Spin } from "antd";

const ModalUploadImage = (props) => {
  // useRef to open the file explorer when <div> is clicked.
  const fileInputRef = useRef(null);
  const {
    showModal,
    setShowModal,
    handleFileSelected,
    url,
    uploadImageLoading,
  } = props;

  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
      onOk={() => fileInputRef.current?.click()}
      okText="Upload Image"
    >
      <div className="image-input-container">
        {url ? (
          uploadImageLoading ? (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          ) : (
            <img
              className="profile-image"
              src={url}
              alt="Selected"
            />
          )
        ) : (
          <>
            <label className="select-image-label">Select Image</label>
            <AiFillCamera size={"25px"} />
          </>
        )}
      </div>
      <input
        id="fileInputTag"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
      />
    </Modal>
  );
};

export default ModalUploadImage;
