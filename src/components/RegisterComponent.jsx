import React, { useState } from "react";
import { RegisterAPI, GoogleSingInAPI } from "../api/AuthAPIs";
import { postUserData } from "../api/FirestoreAPIs";
import linkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { getUniqueID } from "../helpers/getUniqueID";

const RegisterComponent = () => {
  // Using the "navigate" object instead of the "history" object to navigate between different URLs.
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({});
  const register = async () => {
    try {
      // Because the 'RegisterAPI is a promise, we assing the 'await' keyword before it.
      const res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account Created Successfully!");
      // Add a new user to the 'users' collection.
      postUserData({
        name: credentials.name,
        email: credentials.email,
        userID: getUniqueID(),
      });
      localStorage.setItem("userEmail", res.user.email); // Storing the user's email in order to access it later when he posts or perform some operation.
      navigate("/home");
    } catch (error) {
      toast.error("Cannot Create your Account");
    }
  };
  const googleSingIn = async () => {
    try {
      // Because the 'GoogleSingInAPI is a promise, we assing the 'await' keyword before it.
      let res = await GoogleSingInAPI();
      toast.success("Signed In With Google!");
      navigate("/home");
    } catch (error) {
      toast.error("Problem with google authentication");
    }
  };

  return (
    <div className="login-wrapper">
      <img
        src={linkedinLogo}
        className="linkedLogo"
      />
      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>
        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>

        <button
          className="login-btn"
          onClick={register}
        >
          Agree & Join
        </button>
      </div>
      <hr
        className="hr-text"
        data-content="or"
      />
      <div className="google-btn-container">
        <GoogleButton
          className="google-btn"
          onClick={googleSingIn}
        />
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span
            className="join-now"
            onClick={() => navigate("/")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
