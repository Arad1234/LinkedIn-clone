import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loader from "../components/common/Loader/index.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";

// Created LazyLoading components to load each component only if the user enter the route of that component.
const LazyHomeLayout = lazy(() => import("../layouts/HomeLayout.jsx"));
const LazyProfileLayout = lazy(() => import("../layouts/ProfileLayout.jsx"));
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
    element: (
      <Suspense fallback={<Loader />}>
        <LazyHomeLayout />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyProfileLayout />
      </Suspense>
    ),
  },
]);
