import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserActivation() {
  const [activationStatus, setActivationStatus] = useState("Activating...");
  const navigate = useNavigate();
  const { activationToken } = useParams();

  useEffect(() => {
    async function activateUser() {
      try {
        const response = await axios.get(
          `https://capstone-backend-8lpx.onrender.com/api/auth/activate/${activationToken}`
        );

        if (response.data.message === "Account activated successfully") {
          // If user activation is successful, display a success message
          toast.success("User Activation Successful", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          //   setActivationStatus("User Activation Successful");

          // Redirect to the login page
          navigate("/login");
        } else {
          // If activation fails, set an error message
          setActivationStatus("User Activation Failed");
        }
      } catch (error) {
        // Handle API request error
        setActivationStatus("Activation Token is Invalid or Expires");
        console.error(error);
      }
    }

    if (activationToken) {
      activateUser();
    }
  }, [activationToken]);

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
      <div className="content row gx-0">
        <div className="col-md-5">
          <div className="bg-main text-white h-100 d-flex align-items-center justify-content-center flex-column p-5 text-center">
            <h2 className="mb-3 fw-bold"> Back to</h2>
            <Link to="/login">
              <button className="btn btn-outline-light fw-bold rounded-pill py-2 px-4">
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className="col-md-7 bg-light">
          <div className="text-center p-5">
            <h1 className="text-main fw-bolder">User Activation</h1>
            <p>{activationStatus}</p>
            {activationStatus === "User Activation Successful" && (
              <Link to="/login">
                <button className="btn-style text-center mt-3 w-100">
                  Proceed to Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}