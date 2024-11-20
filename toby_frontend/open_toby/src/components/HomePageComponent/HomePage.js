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
    <div className="signup_page_left_side">
      <div>
        <img src={img1} alt="Sign up" />
      </div>

      <div className="signup_page_right_side">
        <h1 id="header_1">Sign up with Toby</h1>
        <h1 id="header_2">Already have an account?<Link to="/login">Log in</Link></h1>
        {/* Google login button */} 
        <div className="google_button">
          <GoogleLoginButton
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
          />
        </div>

        {/* Optional Form Page */}
        <FormPage />

        <div className="footer-content">
          <p>By signing up with Toby, you acknowledge that you have read and</p>
          <p>agree to all applicable Terms of <u>Service</u> and our <u>Privacy policy</u></p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
