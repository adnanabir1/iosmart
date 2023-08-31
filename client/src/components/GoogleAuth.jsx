import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { signInWithGoogle } = useContext(AuthContext);
  const googleLoginHandler = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "user",
        };
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              const notify = () => {
                toast("Loggedin Successfully");
              };
              notify();
              navigate(from, { replace: true });
            }
          });
      })
      .catch((err) => {
        const notify = () => {
          toast.error(err.message);
        };
        notify();
      });
  };
  return (
    <div>
      <button
        type="button"
        onClick={googleLoginHandler}
        className="btn btn-block mt-4"
      >
        Login With Google
      </button>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
  );
};

export default GoogleAuth;
