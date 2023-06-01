import React, { useRef } from "react";
import Loader from "../Loader";
import { AiFillCamera } from "react-icons/ai";

const ProfileImage = (props) => {
  const { loading, url, handleFileSelected } = props;
  const fileInputRef = useRef(null);

  // Global input of type "file" element.
  const inputElement = (
    <input
      id="inputTag"
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleFileSelected}
    />
  );
  return (
    <div
      className="image-input-container"
      onClick={() => fileInputRef.current.click()}
    >
      {url ? (
        loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <img
              className="profile-image"
              src={url}
              alt="Selected"
            />
            {/* Stopping the propergation from continue to the div element when clicking on the label element  */}
            <label
              className="change-profile-label"
              onClick={(event) => event.stopPropagation()}
            >
              Change Image
              {inputElement}
            </label>
          </>
        )
      ) : (
        <>
          {/* Stopping the propergation from continue to the div element when clicking on the label element  */}
          <label
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            Select Image
            {inputElement}
          </label>
          <AiFillCamera size={"25px"} />
        </>
      )}
    </div>
  );
};

export default ProfileImage;
