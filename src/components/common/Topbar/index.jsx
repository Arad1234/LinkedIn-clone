import React from "react";
import "./index.scss";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import userIcon from "../../../assets/user.png";

const Topbar = () => {
  return (
    <div className="topbar-main">
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
        />
        <AiOutlineUserSwitch
          size={30}
          className="react-icon"
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
          className="user-logo"
          src={userIcon}
          alt="userIcon"
        />
      </div>
    </div>
  );
};

export default Topbar;
