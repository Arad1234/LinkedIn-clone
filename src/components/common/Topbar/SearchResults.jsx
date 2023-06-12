import React from "react";
import defaultUserImage from "../../../assets/defaultUser.png";
const SearchResults = (props) => {
  const { user, handleBlur } = props;
  return (
    <div
      onClick={handleBlur}
      className="user-container-result"
    >
      <img
        className="profile-image-result"
        src={user.ProfileImageUrl ? user.ProfileImageUrl : defaultUserImage}
      />
      <p className="user-name">{user.name}</p>
      <p className="user-headline">{user.headline}</p>
    </div>
  );
};

export default SearchResults;
