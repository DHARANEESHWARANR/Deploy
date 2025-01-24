import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const NewUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state;
  const [formData, setFormData] = useState({
    userName: "",
    description: "",
    email: "",
  });

  useEffect(() => {
    console.log(user_id);
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { userName, description, email } = formData;
    const new_user = {
      first_name: userName,
      last_name: "R",
      email: email,
      password: "password",
      admin_user_id: user_id.userId
    };
    try {
      const response = await axios.post("http://localhost:3001/api/v1/users", {
        user: new_user,
      });
      const normal_user_id = response.data.user.id;
      try {
        await axios.post("http://localhost:3001/toby_users", {
          toby_user: {
            user_id: normal_user_id,
            admin_user_id: user_id.userId,
            user_name: userName,
          },
        });
      }  catch(error){ 
        if(error.response){
          console.log(error.response.data);
          alert(error.response.data.details);
        } 
        else{
          console.log(error.message);
        }
    }
      const user = {
        user: {
          first_name: user_id.userName,
          id: user_id.userId,
        },
      };
      navigate("/user_profile", { state: { userData: user } });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.details);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Fancy Header Section */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Super Mode</span> Account Creation!
        </h1>
        <p className="mt-4 text-lg font-medium tracking-wide">
          Your journey to a new experience begins here. Let’s get you started with a personalized account in style! ✨
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Your New Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              placeholder="Enter Your UserName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Why new Account?"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
