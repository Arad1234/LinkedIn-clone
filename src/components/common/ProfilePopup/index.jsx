import React, { useContext } from "react";
import { userContext } from "../../../layouts/HomeLayout";
import { onLogout } from "../../../api/AuthAPIs";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./index.scss";
const ProfilePopup = () => {
  const navigate = useNavigate();
  const currentUser = useContext(userContext);
  return (
    <div className="popup-card">
      <p className="name">{currentUser.name}</p>
      <p className="headline">{currentUser.headline}</p>

      <Button
        title="View Profile"
        // Passing 'onClick' as a prop name.
        onClick={() => navigate("/profile", { state: { id: currentUser.id } })}
      />
      <Button
        title="Log out"
        // Passing 'onClick' as a prop name.
        onClick={onLogout}
      />
    </div>
  );
};

export default ProfilePopup;
