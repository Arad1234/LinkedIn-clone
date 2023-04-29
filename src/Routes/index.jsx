import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";
import ProfileLayout from "../layouts/ProfileLayout.jsx";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
]);
