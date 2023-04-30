import React, { useMemo, useState, createContext, useEffect } from "react";
import Home from "../Pages/Home";
import Topbar from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreAPIs";
// Using context to prevent props drilling until I get to 'PostStatus' component.
export const userContext = createContext({});

const HomeLayout = () => {
  const [currentUser, setCurrentUser] = useState({});
  // This useEffect will be executed every time someone visits the "/home" url, although it have an empty deps array.
  // Every time someone register or login to the website, this useEffect will be triggered.
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div>
      <userContext.Provider value={currentUser}>
        <Topbar />
        <Home />
      </userContext.Provider>
    </div>
  );
};

export default HomeLayout;
