import HomeComponent from "../components/HomeComponent";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // A built in function that is being automatically called when the user authentication state is changing in real time (firebase using websocket).
    onAuthStateChanged(auth, (res) => {
      // If there is no access token, go back to login page automatically before even rendering the home page.
      if (!res?.accessToken) {
        navigate("/login");
      }
    });
  }, []);
  return <HomeComponent />;
};

export default Home;
