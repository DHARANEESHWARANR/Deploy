import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UsersContext';

const UserLoginForm = () => {
  const { usersData, setUsersData } = useContext(UserContext);
  const [formData, setFormData] = useState({
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
      const response = await axios.post("http://localhost:3001/api/v1/login", {
        email: formData.email,
        password: formData.password
      });
      setUsersData(response.data.user.id);
      let toby_users = [];
      const admin_user = {
        'user_id': response.data.user.id,
        'user_name': response.data.user.first_name
      };
      toby_users.push(admin_user);
      localStorage.setItem("Toby_users", JSON.stringify(toby_users));
      navigate('/user_profile', { state: { userData: response.data } });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.error);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-gray-100 to-pink-300 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 transition-transform transform duration-700 hover:scale-110">Welcome to Toby!</h1>
        <p className="text-gray-600 text-lg mt-2">Enjoy seamless login and manage your profile effortlessly.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <div className="mb-6">
          <label htmlFor="email_input" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            id="email_input"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password_input" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password_input"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-pink-300"
          >
            GET STARTED
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">New here? <a href="/" className="text-pink-600 font-bold hover:underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default UserLoginForm;
