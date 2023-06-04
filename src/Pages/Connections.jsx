import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import ConnectionsComponent from "../components/ConnectionsComponent";
import { useNavigate } from "react-router-dom";
const Connections = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      }
    });
  }, []);
  return <ConnectionsComponent />;
};

export default Connections;
