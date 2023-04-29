import React, { useContext } from "react";
import { userCtx } from "../../../layouts/ProfileLayout";
import "./index.scss";

const ProfileCard = (props) => {
  const { onEdit } = props;
  const currentUser = useContext(userCtx);

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>Edit</button>
      </div>
      <h4 className="userName">{currentUser.name}</h4>
      <p className="userEmail">{currentUser.email}</p>
    </div>
  );
};

export default ProfileCard;
