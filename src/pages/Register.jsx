import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-purple-300">Join our learning community</p>
        </header>

        {error && (
          <div className="bg-red-600/20 border border-red-500 text-red-300 p-3 rounded-lg mb-6 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-200">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="yourname@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-purple-200">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
              isLoading ? 'bg-purple-600/50 cursor-wait' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Creating account...</span>
              </div>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-purple-300 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
