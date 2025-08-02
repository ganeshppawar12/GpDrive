import React from "react";

import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate();

  function handellogIn(){
  navigate('/login');
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="flex bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl relative">
        {/* Left Section - Content */}
        <div className="w-1/2 p-10 flex flex-col justify-center relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get started</h1>
          {/* <p className="text-gray-500 mb-6">Already have an account? <span className="text-blue-500 cursor-pointer">Sign in</span></p> */}
          <button
          onClick={handellogIn}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </div>
        
        {/* Right Section - Illustration with Cartoon Style */}
        <div className="w-1/2 bg-blue-500 flex flex-col justify-center items-center text-white p-10 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
            {/* <span className="text-sm">Questions?</span> */}
            {/* <span className="text-blue-200 cursor-pointer">Ask Ho3ein</span> */}
          </div>
          <h2 className="text-2xl font-bold relative z-10">Have your own personal website</h2>
          {/* <p className="mt-4 text-lg relative z-10">Ai-powered tools at your fingertips</p> */}
          <div className="mt-6 w-full h-64 bg-white rounded-lg flex items-center justify-center relative z-10">
            <img src="https://source.unsplash.com/400x300/?cartoon,technology" alt="Cartoon People with Laptop" className="w-full h-full object-cover rounded-lg" />
          </div>
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0 flex justify-center items-center">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
              <circle cx="250" cy="250" r="200" fill="#ffcc00" opacity="0.3" />
              <circle cx="150" cy="150" r="100" fill="#ff6699" opacity="0.3" />
              <circle cx="350" cy="350" r="120" fill="#66ccff" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
