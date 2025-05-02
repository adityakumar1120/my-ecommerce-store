import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sideImg from '../assets/productsAssets/sideImg.png';
const Login = () => {
  const [formData, setFormData] = useState({
    emailPhone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen max-w-[1250px] mx-auto mt-12  flex flex-col lg:flex-row">
      {/* Left side - Image */}
      <div className="lg:w-1/2 relative overflow-hidden bg-[#c8e7f0]">
        <img
          src={sideImg}
          alt="Shopping cart with mobile phone"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right side - Form */}
      <div className="lg:w-1/2 px-6 py-12 lg:px-16 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2">Log in to Exclusive</h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-6">
              

            <div>
              <input
                type="text"
                name="emailPhone"
                value={formData.emailPhone}
                onChange={handleChange}
                placeholder="Email or Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className='flex justify-between items-center'>
            <button
              type="submit"
              className="w-[30%] bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200 font-medium"
            >
              Login
            </button>

            <span className='text-red-400'>Forgot Password?</span>
            </div>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/signUp" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;