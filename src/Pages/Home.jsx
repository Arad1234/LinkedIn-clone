import HomeComponent from "../components/HomeComponent";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // A built in function that is being automatically called when the user authentication state is changing in real time.
    onAuthStateChanged(auth, (res) => {
      // If there is no access token, go back to login page automatically before even rendering the home page.
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        setLoading(false); // Show home page
      }
    });
  }, []);
  return loading ? <Loader /> : <HomeComponent />;
};

export default Home;
