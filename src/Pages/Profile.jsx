import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
const Profile = () => {
  const navitage = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      console.log("start");
      if (!res?.accessToken) {
        navitage("/login");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : <ProfileComponent />;
};

export default Profile;
