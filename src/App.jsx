import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyRandomString from "./components/VerifyRandomString";
import Navbar from "./components/Navbar";
import UserActivation from "./components/UserActivation";
import BlogHome from "./components/BlogHome";
import CreateStory from "./components/CreateStory";
import EditStory from "./components/EditStory";
// import Info from "./components/Info";
import ViewStory from "./components/ViewStory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<BlogHome />} />
        <Route path="/createStory" element={<CreateStory />} />
        <Route path="/story/:storyId" element={<ViewStory />} />
        <Route path="/editStory/:storyId" element={<EditStory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:activationToken" element={<UserActivation />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/verifyRandomString/:randomString"
          element={<VerifyRandomString />}
        />
        <Route
          path="/resetPassword/:randomString"
          element={<ResetPassword />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;