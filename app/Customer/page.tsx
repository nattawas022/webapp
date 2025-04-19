// ./app/Customer/page.tsx
'use client'; // Add this directive to use React hooks like useState

import { useState } from 'react';
import Head from 'next/head';

type FormMode = 'register' | 'login';

export default function AuthPage() {
  const [mode, setMode] = useState<FormMode>('login');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    businessEmail: '',
    companyAddress: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstname || !formData.lastname || !formData.businessEmail || !formData.password) {
      setMessage('Please fill in all required fields');
      return;
    }
    
    if (mode === 'register' && !validateEmail(formData.businessEmail)) {
      setMessage('Please enter a valid business email');
      return;
    }

    // In a real application, you would send this data to your API
    setMessage(`${mode === 'register' ? 'Registration' : 'Login'} successful!`);
    console.log(formData);
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const toggleMode = () => {
    setMode(prev => prev === 'register' ? 'login' : 'register');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {mode === 'register' ? 'Register' : 'Login'}
        </h1>
        
        {message && (
          <div className={`mb-4 p-2 rounded ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="businessEmail" className="block text-gray-700 text-sm font-bold mb-2">
              Business Email
            </label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {mode === 'register' && (
            <div className="mb-4">
              <label htmlFor="companyAddress" className="block text-gray-700 text-sm font-bold mb-2">
                Company Address (not necessary)
              </label>
              <input
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {mode === 'register' ? 'Register' : 'Login'}
            </button>
            <button
              type="button"
              onClick={toggleMode}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {mode === 'register' ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>
          {mode === 'register' ? 'Register requires:' : 'Login requires:'}
        </p>
        <ul className="list-disc pl-5">
          <li>firstname</li>
          <li>lastname</li>
          <li>business email</li>
          {mode === 'register' && <li>company address (not necessary)</li>}
          <li>password</li>
        </ul>
      </div>
    </div>
  );
}