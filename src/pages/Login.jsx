import React, { useState } from 'react';
import { Mail, Lock, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        console.log('data.user', data.user);
        navigate('/dashboard', {state: { userData: data.user }}); // Redirect to dashboard on success
      } else {
        setError(data.message || 'Login failed'); // Display error message
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <Link to="/">
          <button className="mb-4 flex items-center text-gray-600 hover:text-gray-800">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </Link>
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-blue-500 p-2">
            <img alt="Logo" src="/placeholder.svg?height=24&width=24" className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        {error && (
          <div className="mt-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
  <div className="relative flex items-center">
    <Mail className="absolute left-3 h-5 w-5 text-gray-400" />
    <input
      id="email-address"
      name="email"
      type="email"
      autoComplete="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="appearance-none w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      placeholder="Email address"
    />
  </div>
  <div className="relative flex items-center">
    <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
    <input
      id="password"
      name="password"
      type="password"
      autoComplete="current-password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="appearance-none w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      placeholder="Password"
    />
  </div>
</div>

          <div className="mt-8">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}