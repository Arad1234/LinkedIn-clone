import React, { useContext, useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { profileUserContext } from "../../../layouts/ProfileLayout";

const ProfileImage = (props) => {
  const currentUser = useContext(profileUserContext);
  const { url, currentProfile, setShowModal } = props;
  const isProfileOfCurrentUser = currentUser.id === currentProfile.id;

  return (
    <div
      className="image-input-container"
      onClick={() => isProfileOfCurrentUser && setShowModal(true)}
    >
      {url ? (
        <img
          className="profile-image"
          src={url}
          alt="Selected"
        />
      ) : isProfileOfCurrentUser ? (
        <>
          <label className="select-image-label">Select Image</label>
          <AiFillCamera size={"25px"} />
        </>
      ) : (
        <h3>No photo</h3>
      )}
    </div>
  );
};
export default ProfileImage;
