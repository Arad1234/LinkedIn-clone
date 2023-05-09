import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navitage = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navitage("/");
      }
    });
  }, []);

  return <ProfileComponent />;
};

export default Profile;
