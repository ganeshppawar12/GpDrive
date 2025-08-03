import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
const navigate = useNavigate();
      const [name , setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
        const api = import.meta.env.VITE_API_URL;

       const handlesignup = async (e) => {
          e.preventDefault();
          setError('');
      
          try {
            const res = await axios.post(`${api}/api/auth/signup`, {
             name,
                email,
              password,
            });
      
            const { token, user } = res.data;
      
            // localStorage.setItem('token', token);
            // localStorage.setItem('user', JSON.stringify(user));
      
            // Redirect after login
              navigate('/login');
          } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            console.log(err);
          }
        };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            ✨
          </div>
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="text-gray-500 text-sm text-center">Sign up to get started with your journey</p>
        </div>

        {/* Social Signup */}
        <div className="flex gap-4 justify-center mb-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
            <img src="https://www.svgrepo.com/show/303128/apple-logo.svg" alt="Apple" className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
            <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="border-t flex-grow"></div>
          <span className="mx-2 text-sm text-gray-400">or</span>
          <div className="border-t flex-grow"></div>
        </div>

        {/* Signup Form */}
        <form className="space-y-4"  onSubmit={handlesignup}>
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
               value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
               value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Create account
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/#/" className="text-purple-600 font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
