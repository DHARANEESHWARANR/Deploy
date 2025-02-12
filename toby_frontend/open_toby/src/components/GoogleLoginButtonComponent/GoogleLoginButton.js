import React from "react";
import { GoogleLogin } from '@react-oauth/google'; // Import from the new package
import img2 from '../../assets/google.png'; // Ensure your image is properly imported

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const responseGoogle = (response) => {
    if (response.credential) {
      onLoginSuccess(response); // Pass the response to the parent component
    } else {
      onLoginFailure(response); // Handle failure if needed
    }
  };

  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={responseGoogle}
      useOneTap
      theme="outline" // Customize the theme as needed
      shape="circle"  // Choose the shape of the button
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className='google_button_text'
        >
          <img className="google_button_image" src={img2} alt="Google Logo" />
          CONTINUE WITH GOOGLE
        </button>
      )}
    />
  );
};

export default GoogleLoginButton;
