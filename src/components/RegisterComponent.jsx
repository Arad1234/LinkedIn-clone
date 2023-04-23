import React, { useState } from "react";
import { RegisterAPI, GoogleSingInAPI } from "../api/AuthAPI";
import linkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

const RegisterComponent = () => {
  //// Using the "navigate" object instead of the "history" object to navigate between different URLs.
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      //// Because the 'LoginAPI is a promise, we assing the 'await' keyword before it.
      const res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account Created Successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Cannot Create your Account");
    }
  };
  const googleSingIn = async () => {
    try {
      //// Because the 'GoogleSingInAPI is a promise, we assing the 'await' keyword before it.
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
        <h1 className="heading">Make most of your professional life</h1>
        <div className="auth-inputs">
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
          onClick={login}
        >
          Agree & Join
        </button>
        {/* <button onClick={register}>Register to Linkedin</button> */}
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
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
