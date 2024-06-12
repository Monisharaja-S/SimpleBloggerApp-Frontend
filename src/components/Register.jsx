import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../utils/utils";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    firstName: yup.string().required("Enter First Name"),
    lastName: yup.string().required("Enter Last Name"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password start with capital letter then from 5 to 10 letters or digits"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setTouched }) => {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      });
      if (Object.keys(formik.errors).length === 0) {
        sendData(values);
      } else {
        setSubmitting(false);
      }
    },
  });

  async function sendData(values) {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://capstone-backend-8lpx.onrender.com/api/auth/register`,
        values
      );
      const data = response.data;

      setLoading(false);

      // Handle successful registration
      toast.success("Register Successful. Reset Email Sent.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/login");
    } catch (err) {
      // Handle errors
      setLoading(false);
      const errorMessage = err.response?.data?.error || "Internal Server Error";
      setError(errorMessage);

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  function changeBgRegister() {
    document.getElementById("changeR").classList.add("auth");
  }

  return (
    <>
      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
        <div className="content row gx-0">
          <div className="col-md-5">
            <div className="bg-main text-white h-100 d-flex align-items-center justify-content-center flex-column p-5 text-center">
              <h2 className="mb-3 fw-bold">Already Registered !</h2>
              <p>Click Login</p>
              <Link to={"/login"}>
                <button className="btn btn-outline-light fw-bold rounded-pill py-2 px-4">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-7 bg-side-bar">
            <div className="text-center p-5">
              <h1 className="text-main fw-bolder">Create Account</h1>
              <form onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger ">{error}</p> : ""}
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter First Name"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.firstName}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.lastName}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Enter Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}
                <div className="position-relative">
                  <input
                    id="password-input"
                    type="password"
                    className="form-control mt-3"
                    placeholder="Enter Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <i
                    onClick={() => togglePasswordVisibility()}
                    className="fa-regular fa-eye-slash eyeIcon"
                  ></i>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <button
                  onClick={() => changeBgRegister()}
                  id="changeR"
                  type="submit"
                  className="btn-style text-center mt-3 w-100"
                >
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <Oval
                        height={30}
                        width={30}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#86b7fe"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
