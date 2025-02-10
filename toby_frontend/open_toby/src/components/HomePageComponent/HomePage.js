import React, { useState } from "react";
import img1 from '../../assets/signup.png';
import './HomePage.css';
import FormPage from "./FormPage";
import GoogleLoginButton from "../GoogleLoginButtonComponent/GoogleLoginButton"; // Correct path
import { Link } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    setUser(response.profileObj); // Store the user profile in state
  };

  const handleLoginFailure = (response) => {
    console.log("Google login failure:", response);
  };

  return (
    <div>
      <div>
        <FormPage />
      </div>
    </div>
  );
};

export default HomePage;
