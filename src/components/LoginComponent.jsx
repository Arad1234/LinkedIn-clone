import React, { useState } from "react";
import { LoginAPI, GoogleSingInAPI } from "../api/AuthAPIs";
import linkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

const LoginComponent = () => {
  // Using the "navigate" object instead of the "history" object to navigate between different URLs.
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      // Because the 'LoginAPI is a promise, we assing the 'await' keyword before it.
      const res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to LinkedIn!");
      localStorage.setItem("userEmail", res.user.email); // Storing the user's email in order to access it for identify the current user later when he posts or perform some operation.
      navigate("/home");
    } catch (error) {
      toast.error("Please Check your Credentials");
    }
  };
  const googleSingIn = async () => {
    try {
      // Because the 'GoogleSingInAPI()' is a promise, we assing the 'await' keyword before it.
      const res = await GoogleSingInAPI();
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
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>
        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            name="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>

        <button
          className="login-btn"
          onClick={login}
        >
          Sign in
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
          New to LinkedIn?
          <span
            className="join-now"
            onClick={() => navigate("/")}
          >
            Join now
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
