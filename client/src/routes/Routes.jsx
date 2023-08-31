import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Root from "../layouts/Root";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Shop from "../pages/Shop/Shop";
import MyCart from "../pages/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/shop",
        element: (
          <PrivateRoute>
            <Shop />
          </PrivateRoute>
        ),
      },
      {
        path: "/mycart",
        element: (
          <PrivateRoute>
            <MyCart />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
