import React from "react";
import { onLogout } from "../../../api/AuthAPIs";
import "./index.scss";
const ProfilePopup = () => {
  return (
    <div className="popup-card">
      <ul className="popup-options">
        <li
          className="popup-option"
          onClick={onLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
