import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Userloginpage = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const [loading , setLoading] = useState(false);

  const api = import.meta.env.VITE_API_URL;




  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${api}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect after login
        navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.log(err);
    }
      setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            🌐
          </div>
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-gray-500 text-sm">Please enter your details to sign in</p>
        </div>

        {/* Optional Error Message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
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
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border rounded-lg pr-10 outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-500" />
              Remember for 30 days
            </label>
            <a href="#" className="text-purple-600 hover:underline">Forgot password?</a>
          </div>

          <button
              disabled={loading}
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
               {loading 
              ?  <Box sx={{ display: 'flex' }}>
                     <CircularProgress />
                  </Box> 
              :  'Sign in'} 
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="https://gp-drive-w9b5.vercel.app/#/signup" className="text-purple-600 font-medium hover:underline cursor-pointer">Create account</a>
        </p>
      </div>
    </div>
  );
};

export default Userloginpage;
