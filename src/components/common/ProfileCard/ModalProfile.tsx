import React, { useRef } from "react";
import "./index.scss";
import { Modal } from "antd";
import { AiFillCamera } from "react-icons/ai";

const ModalProfile = (props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { showModal, setShowModal, handleFileSelected, url } =
    props;

  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
      onOk={() => fileInputRef.current?.click()}
      okText="Upload Image"
    >
      <div className="image-input-container">
        {url ? (
          <img
            className="profile-image"
            src={url}
            alt="Selected"
          />
        ) : (
          <>
            <label className="select-image-label">Select Image</label>
            <AiFillCamera size={"25px"} />
          </>
        )}
      </div>
      <input
        id="inputTag"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
      />
    </Modal>
  );
};

export default ModalProfile;
