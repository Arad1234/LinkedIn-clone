import React, { useContext } from "react";
import { homeUserContext } from "../../../layouts/HomeLayout";
import { connectionsUserContext } from "../../../layouts/ConnectionsLayout";
import { onLogout } from "../../../api/AuthAPIs";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../Button";
import "./index.scss";
const ProfilePopup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const homeCurrentUser = useContext(homeUserContext);
  const connectionsCurrentUser = useContext(connectionsUserContext);
  // Checks from what route the user navigated to the profile page.
  const currentUser =
    location.pathname === "/home" ? homeCurrentUser : connectionsCurrentUser;
  return (
    <div className="popup-card">
      <p className="name">{currentUser.name}</p>
      <p className="headline">{currentUser.headline}</p>
      {/* If the path the the user is currently on is the /profile route, the "View Profile" button will not be appear. */}
      {location.pathname === "/profile" ? null : (
        <Button
          title="View Profile"
          // Passing 'onClick' as a prop name.
          onClick={() => {
            navigate("/profile", { state: { id: currentUser.userID } });
          }}
        />
      )}
      <Button
        title="Log out"
        // Passing 'onClick' as a prop name.
        onClick={onLogout}
      />
    </div>
  );
};

export default ProfilePopup;
