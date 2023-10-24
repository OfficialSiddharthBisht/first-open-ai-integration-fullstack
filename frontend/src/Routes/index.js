import React from "react";
import {Navigate, useLocation, useRoutes} from 'react-router-dom';
import AuthMainLayout from "../Components/Layout/AuthMainLayout";
import MainLayout from "../Components/Layout/MainLayout";

// Pages Import For routing like login signup 404 and others
import Home from "../Components/Pages/Home";
import Login from "../Components/Pages/Auth/Login";
import Signup from "../Components/Pages/Auth/Signup";
import Page_404 from '../Components/Pages/LostPages/Page_404';
import Page_500 from '../Components/Pages/LostPages/Page_500';

// Routing function

export default function Router() {
    return useRoutes([
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },
  
      {
        path: "",
        element: <AuthMainLayout />,
        children: [
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
  
      { path: "404", element: <Page_404 /> },
      { path: "500", element: <Page_500 /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ]);
  }