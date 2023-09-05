import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Root from "../layouts/Root";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Shop from "../pages/Shop/Shop";
import MyCart from "../pages/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AdminPanel from "../pages/Dashboard/Admin/AdminPanel/AdminPanel";
import AddProduct from "../pages/Dashboard/Admin/AddProduct/AddProduct";
import ManageProducts from "../pages/Dashboard/Admin/ManageProducts/ManageProducts";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import UpdateProduct from "../pages/Dashboard/Admin/UpdateProduct/UpdatePRoduct";

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
        element: <Shop />,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminPanel />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "manage-products/update/product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);
export default router;
