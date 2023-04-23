import React, { useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      //// If there is an access token, go to home page automatically before even rendering the login page.
      if (res?.accessToken) {
        navigate("/home");
      } else {
        setLoading(false); //// Show login page
      }
    });
  });
  return !loading ? <LoginComponent /> : <Loader />;
};

export default Login;
