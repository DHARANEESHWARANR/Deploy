import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './components/HomePageComponent/HomePage';
import UserProfile from './components/UserProfileComponent/UserProfile';
import UserLoginForm from './components/UserLoginFormComponent/UserLoginForm';

function App() {
  return (
    <GoogleOAuthProvider clientId="303825068922-0i5n5e3p1i1ecto6brf792tpkchjtnei.apps.googleusercontent.com">
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user_profile" element={<UserProfile/>} />
          <Route path="/login" element={<UserLoginForm/>} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
