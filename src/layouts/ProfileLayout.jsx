import React, { useEffect, useState, createContext } from "react";
import Profile from "../Pages/Profile";
import { getCurrentUser } from "../api/FirestoreAPIs";
import Topbar from "../components/common/Topbar";

export const profileUserContext = createContext({});

const ProfileLayout = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const closeConnection = getCurrentUser(setCurrentUser);

    return () => {
      // Close the webSocket connection when the component is unmounted.
      closeConnection();
    };
  }, []);
  return (
    <div>
      <Topbar />
      <profileUserContext.Provider value={currentUser}>
        <Profile />
      </profileUserContext.Provider>
    </div>
  );
};

export default ProfileLayout;
