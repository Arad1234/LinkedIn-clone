import React, { useEffect, useState, useRef } from "react";
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
import SearchUsers from "../SearchUsers";
import { getSearchedUsers } from "../../../api/FirestoreAPIs";
import SearchResults from "./SearchResults";

const Topbar = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isPageLong, setIsPageLong] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  useEffect(() => {
    // Check the width of the page to render the search bar.
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsPageLong(windowWidth > 1200);
    };
    handleResize();
    // Created an event listener for resizing the window browser.
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Using debouncing function to call the "getSearchedUsers" function only when the user stopped searching for 300ms or more.
    // This setTimeout function will be created right after the previous one has been cleared.
    const debouncing = setTimeout(() => {
      getSearchedUsers(setAllUsers, searchInputValue);
    }, 200);
    return () => {
      // This function will cancel the previos setTimeout from the js runtime.
      clearTimeout(debouncing);
    };
  }, [searchInputValue]);

  useEffect(() => {
    if (showSearchBar) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  const goToRoute = (route, optionalData) => {
    navigate(route, optionalData);
  };

  // Only if the input is focuesed I will show all the users as search results.
  const handleFocus = () => {
    setIsInputFocus(true);
  };
  const handleBlur = () => {
    setIsInputFocus(false);
    setShowSearchBar(false);
    setSearchInputValue("");
  };

  // Variable for all the icons so I will not repeat the JSX code.
  const allIconsHTML = (
    <>
      <AiOutlineHome
        size={30}
        className="react-icon"
        onClick={() => goToRoute("/home")}
      />
      <AiOutlineUserSwitch
        size={30}
        className="react-icon"
        onClick={() => goToRoute("/connections")}
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
    </>
  );
  // Gloabal props for the searchUsers component.
  const searchUsersProps = {
    inputRef,
    setSearchInputValue,
    searchInputValue,
    handleFocus,
    handleBlur,
  };
  return (
    <nav className="topbar-main">
      <img
        onClick={() => goToRoute("/home")}
        className="linkedin-logo"
        src={LinkedinLogo}
        alt="LinkedinLogo"
      />
      <div className="react-icons">
        {/* Rendering the SearchBar component if the page is wide enough. */}
        {isPageLong ? (
          <>
            <SearchUsers {...searchUsersProps} />
            {allIconsHTML}
          </>
        ) : showSearchBar ? (
          <SearchUsers {...searchUsersProps} />
        ) : (
          <>
            <AiOutlineSearch
              size={30}
              className="react-icon"
              onClick={() => setShowSearchBar(true)}
            />
            {allIconsHTML}
          </>
        )}

        <img
          onClick={() => setShowLogoutPopup(!showLogoutPopup)}
          className="user-logo"
          src={userIcon}
          alt="userIcon"
        />
        {showLogoutPopup ? (
          <div className="popup-position">
            <ProfilePopup />
          </div>
        ) : null}
      </div>
      {isInputFocus && (
        <div className="search-results">
          {allUsers.map((user) => {
            return (
              <div
                onClick={() =>
                  goToRoute("/profile", {
                    state: { id: user.userID },
                  })
                }
                key={user.userID}
              >
                <SearchResults
                  user={user}
                  handleBlur={handleBlur}
                />
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Topbar;
