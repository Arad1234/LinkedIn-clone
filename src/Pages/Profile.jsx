import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navitage = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      // res.accessToken = "";
      if (!res?.accessToken) {
        navitage("/login");
      }
    });
  }, []);

  return <ProfileComponent />;
};

export default Profile;
