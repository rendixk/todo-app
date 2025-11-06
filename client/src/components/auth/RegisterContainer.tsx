import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Users } from '../../types/Users';
import { registerUser } from '../../api/userAPI';
import AuthFormLayout from './AuthFormLayout';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

interface LoginContainerProps {
  isDarkMode?: boolean;
}

export default function LoginContainer({ isDarkMode }: LoginContainerProps) {
  const [form, setForm] = useState<Pick<Users, "email" | "password">>({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Dapatkan fungsi login dari AuthContext

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.email) {
        setError("Email form must be filled");
        return;
      }
      if (!form.password) {
        setError("Password form must be filled");
        return;
      }

      const res = await registerUser(form);
      console.log(res);

      // Panggil fungsi login dari AuthContext untuk menyimpan token dan email
      login(res.token, form.email);

      setMessage("Sign Up Successfull!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisibility = () => { 
    setShowPassword(prev => !prev);
  };

  return (
    <AuthFormLayout
      title="Welcome!"
      subtitleText="Sign up first to get full access"
      footerText="Have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit}>
        {message && (
          <p className="text-green-400 text-center mb-4">{message}</p>
        )}
        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Email:
          </label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200
            ${isDarkMode ? 'bg-gray-700 border-gray-700 text-gray-50 placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'}`}
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Password:
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200
            ${isDarkMode ? 'bg-gray-700 border-gray-700 text-gray-50 placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 pr-10'}`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute inset-y-0 right-0 top-6 flex items-center pr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </AuthFormLayout>
  );
}
