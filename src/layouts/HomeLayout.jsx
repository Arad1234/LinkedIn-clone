import React, { useState, createContext, useEffect } from "react";
import Home from "../Pages/Home";
import Topbar from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreAPIs";
// Using context to prevent props drilling until I get to 'PostStatus' component.
export const homeUserContext = createContext({});

const HomeLayout = () => {
  const [currentUser, setCurrentUser] = useState({});
  // This useEffect will be executed every time someone visits the "/home" url, although it have an empty deps array.
  // Every time someone register or login to the website, this useEffect will be triggered.
  useEffect(() => {
    const closeConnection = getCurrentUser(setCurrentUser);
    return () => {
      // Closing the webSocket connection by returning the onSnapshot function - firebase built in feature.
      closeConnection();
    };
  }, []);

  return (
    <div>
      <homeUserContext.Provider value={currentUser}>
        <Topbar />
        <Home />
      </homeUserContext.Provider>
    </div>
  );
};

export default HomeLayout;
