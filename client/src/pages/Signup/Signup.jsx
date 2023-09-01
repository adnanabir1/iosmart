import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from "../../components/GoogleAuth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { createUser, logout, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      setError(false);
    } else {
      setError(true);
      return;
    }
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photo).then(() => {
          const userData = {
            name: data.name,
            email: data.email,
            image: data.photo,
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
                swal("Account Created Successfully");
                reset();
                logout();
                navigate("/login");
              }
            });
        });
      })
      .catch((err) => {
        swal(err.message);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mt-20 hero">
        <div className="hero-content w-1/2 flex-col lg:flex-row-reverse">
          <div className=" card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <h1 className="text-center text-3xl my-3 font-bold">Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500">
                    Name must be filled & cant contain numbers
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-500">
                    Password must be between 6-20 charecters
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="confirm password"
                  className="input input-bordered"
                />
                {error && (
                  <span className="text-red-500">Password Ditn't Match</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-500">Photo URL is required</span>
                )}
              </div>

              <label className="label">
                <span>
                  Don't Have An Account?{" "}
                  <Link className="text-purple-600" to={"/login"}>
                    Login
                  </Link>
                </span>
              </label>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Signup"}
                  className="btn btn-primary"
                />
              </div>
              <GoogleAuth />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
