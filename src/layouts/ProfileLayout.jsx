import React, { useEffect, useState, createContext } from "react";
import Profile from "../Pages/Profile";
import { getCurrentUser } from "../api/FirestoreAPIs";
import Topbar from "../components/common/Topbar";

export const userCtx = createContext({});

const ProfileLayout = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  console.log(currentUser);
  return (
    <div>
      <Topbar />
      <userCtx.Provider value={currentUser}>
        <Profile />
      </userCtx.Provider>
    </div>
  );
};

export default ProfileLayout;
