import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UsersContext';
import { Link } from "react-router-dom";
const FormPage = () => {
  const { usersData, setUsersData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverHost = process.env.REACT_APP_SERVER_HOST;
      const response = await axios.post(`http://${process.env.REACT_APP_SERVER_HOST}:3001/api/v1/users`, {
        user: formData
      });
      setUsersData(response.data.user.id);
      localStorage.setItem('user_id', response.data.user.id);
      localStorage.setItem('user_name', response.data.user.first_name);
      navigate('/user_profile', { state: { userData: response.data } });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.details);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-white to-gray-200 flex items-center justify-center py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-pink-600 text-center mb-4">Welcome to the Sign-Up Page</h2>
        <p className="text-gray-600 text-center mb-8">Join us and enjoy a seamless experience!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="First Name"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Get Started
          </button>
          <h1 id="header_2" className='pl-32'>Already have an account? <Link to="/login">Log in</Link></h1>
          </form>
        <div className="footer-content">
          <p>By signing up with Toby, you acknowledge that you have read and</p>
          <p>agree to all applicable Terms of <u>Service</u> and our <u>Privacy policy</u></p>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
