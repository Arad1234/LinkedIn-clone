import React, { useState } from "react";
import "./index.scss";
import ProfilePopup from "../ProfilePopup";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import userIcon from "../../../assets/user.png";

const Topbar = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const goToRoute = (route) => {
    navigate(route);
  };
  return (
    <div className="topbar-main">
      {/* Topbar icons */}
      <img
        className="linkedin-logo"
        src={LinkedinLogo}
        alt="LinkedinLogo"
      />
      <div className="react-icons">
        <AiOutlineSearch
          size={30}
          className="react-icon"
        />
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/home")}
        />
        <AiOutlineUserSwitch
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/profile")}
        />
        <BsBriefcase
          size={30}
          className="react-icon"
        />
        <AiOutlineMessage
          size={30}
          className="react-icon"
        />
        <AiOutlineBell
          size={30}
          className="react-icon"
        />
        <img
          onClick={() => setShowLogoutPopup(!showLogoutPopup)}
          className="user-logo"
          src={userIcon}
          alt="userIcon"
        />
        {showLogoutPopup ? <ProfilePopup /> : null} {/* Topbar icons */}
      </div>
    </div>
  );
};

export default Topbar;
